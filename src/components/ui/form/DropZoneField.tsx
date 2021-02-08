import { useField } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

const validTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];

function Preview(props: { file: Blob; fileRejection: FileRejection }) {
    let { file, fileRejection } = props;
    let [loading, setLoading] = useState(false);
    let [thumb, setThumb] = useState("");

    useEffect(() => {
        if (!file) {
            return;
        }
        setLoading(true);
        let reader = new FileReader();
        reader.onloadend = () => {
            setThumb(reader.result as string);
            setLoading(false);
        };
        reader.readAsDataURL(file);
    }, [file]);

    console.log(fileRejection);
    if (fileRejection && fileRejection.errors.length !== 0) {
        return fileRejection.errors.map((value) => <p key={value.message}> {value.message}</p>);
    }
    if (!file || loading) {
        return <p className={`text-center select-none my-auto font-semibold text-xl`}>Upload logo</p>;
    }

    return <img src={thumb} className={`w-64 h-64 mx-auto sm:mx-0`} alt={"project logo"} />;
}

export default function DropZoneField(props: { name: string }) {
    const [field, meta, helpers] = useField(props);

    const { touched, error, value } = meta;
    const { setValue, setTouched } = helpers;

    return (
        <Dropzone
            onDrop={(acceptedFiles) => {
                const file = acceptedFiles[0];
                setValue(file);
            }}
            onFileDialogCancel={() => {
                setTouched(true);
            }}
            maxFiles={1}
            multiple={false}
            //@ts-ignore
            validator={(file) => {
                if (validTypes.indexOf(file.type) == -1) {
                    return { code: "file-invalid-type", message: "Invalid file type!" };
                }
                return null;
            }}
            accept={validTypes}
        >
            {({ getRootProps, getInputProps, fileRejections }) => (
                <div {...getRootProps()} className={`grid w-64 h-64 mx-auto sm:mx-0 border-2 dark:border-dark-700 box-content cursor-pointer`}>
                    <input {...getInputProps()} />
                    <div className={`grid w-full h-full`}>
                        <Preview file={value} fileRejection={(fileRejections || [])[0]} />
                    </div>
                </div>
            )}
        </Dropzone>
    );
}
