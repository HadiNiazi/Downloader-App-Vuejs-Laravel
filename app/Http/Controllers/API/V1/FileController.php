<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\FileRequest;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function openFiles()
    {
        $files = File::with(['user'])->get();

        return response()->json($files, 200);
    }

    public function downloadFiles($id)
    {
        $file = File::find($id);

        if (! $file) {
            return response()->json([
                'error' => 'Unable to find the file, please refresh webpage and try again, If still problem persists you contact with administrator'
            ], 404);
        }

        $fileWithPath = $file->name;

        if (! Storage::exists($fileWithPath)) {
            return response()->json([
                'error' => 'File not found'
            ], 404);
        }

        $file->update([
            'downloads' => $file->downloads + 1
        ]);

        return Storage::download($fileWithPath);

    }

    public function uploadFile(FileRequest $request)
    {

        if ($request->hasFile('file')) {

            $file = $request->file->store('Uploads/Files');

            if (auth()->check()) {

                try {

                    File::create([
                        'name' => $file,
                        'user_id' => auth()->id()
                    ]);

                    return response()->json([
                        'message' => 'File Uploaded Successfully'
                    ], 201);

                }
                catch (\Exception $ex) {
                    return response()->json([
                        'error' => 'Unable to upload the file, due to this error '.$ex->getMessage()
                    ], 401);
                }

            }



        }
    }

}
