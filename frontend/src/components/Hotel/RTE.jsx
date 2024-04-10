import React from "react";
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'
import './Hotel.scss'
const RTE =({name,control,defaultValue=""})=>{
    return(
        <div className="Tiny">
            <Controller 
                name={name || "name"}
                control={control}
                render={({field:{onChange}})=>(
                    <Editor
                    initialValue={defaultValue}
                    apiKey='pdy1pfs8y9n0q6ohwoxxvpmspsfmke9mizu4c0ab6havqp82'
                    init={{
                        initialValue: {defaultValue},
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                    />
             )}
            />
        </div>
    )
}

export default RTE