import React from 'react'
import {Editor} from '@tinymce/tinymce-react'

const TextEditor: React.FC<any> = (
    {value, onChange, placeholder = 'Описание товара...'}: any) => {
    const editorPlugins = [
        'advlist autolink lists link charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media'
    ]

    const editorToolsBar =
        'formatselect | bold italic backcolor |' +
        ' alignleft aligncenter alignright alignjustify |' +
        ' bullist numlist outdent indent | removeformat'
    return (
        <div>
            <Editor
                apiKey={process.env.MIX_TINYMCE_API_KEY}
                initialValue={value}
                init={{
                    height: 220,
                    placeholder: placeholder,
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
