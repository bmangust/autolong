import React from 'react'
import {Editor} from '@tinymce/tinymce-react'

const TextEditor: React.FC<any> = ({value, onChange}: any) => {
    const editorPlugins = [
        'advlist autolink lists link charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media'
    ]

    const editorToolsBar =
        'undo redo | formatselect | bold italic backcolor |' +
        ' alignleft aligncenter alignright alignjustify |' +
        ' bullist numlist outdent indent | removeformat'
    return (
        <div>
            <Editor
                apiKey={process.env.MIX_TINYMCE_API_KEY}
                initialValue={value}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: editorPlugins,
                    toolbar: editorToolsBar
                }}
                onEditorChange={onChange}
            />
        </div>
    )
}

export default TextEditor
