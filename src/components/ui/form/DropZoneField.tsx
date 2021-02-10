import { useField } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone, { FileError, FileRejection } from "react-dropzone";
import fileSize from "filesize";
import { onLoadAsync, readUploadedFileAsText } from "../../../utils/util";

// TODO pass these in as props
const validTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"];
const fileSizeLimit = 1000000;
const imageSizeRestriction = 1024 * 8;

function Preview(props: { file: Blob }) {
    const { file } = props;
    const [loading, setLoading] = useState(false);
    const [thumb, setThumb] = useState("");

    useEffect(() => {
        if (!file) {
            return;
        }
        setLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumb(reader.result as string);
            setLoading(false);
        };
        reader.readAsDataURL(file);
    }, [file]);

    if (!file || loading) {
        return <p className={`text-center select-none my-auto font-semibold text-xl`}>Upload logo</p>;
    }

    return <img src={thumb} className={`w-64 h-64 mx-auto sm:mx-0`} alt={"project logo"} />;
}

export default function DropZoneField(props: { name: string; setErrors: (errors: string[]) => void }) {
    const [field, meta, helpers] = useField(props);

    const { setErrors } = props;
    const { touched, error, value } = meta;
    const { setValue, setTouched } = helpers;

    return (
        <Dropzone
            onDrop={async (acceptedFiles, fileRejections) => {
                const file = acceptedFiles[0];
                const errors: string[] = [];
                if (fileRejections && fileRejections.length > 0) {
                    fileRejections[0].errors.map((error) => {
                        errors.push(error.message);
                    });
                }
                if (file) {
                    const img = new Image();
                    const imageProm: Promise<HTMLImageElement> = onLoadAsync(img);
                    img.src = URL.createObjectURL(file);
                    const image: HTMLImageElement = await imageProm;

                    if (image.width != image.height) {
                        errors.push("Image width and height need to be the same (1:1 ratio)!");
                    }

                    if (img.width > imageSizeRestriction || img.height > imageSizeRestriction) {
                        errors.push(`Project Logo can not be bigger than ${imageSizeRestriction}!`);
                    }
                }
                setErrors(errors);
                if (errors.length === 0) {
                    setValue(file);
                } else {
                    setValue(null);
                }
            }}
            onFileDialogCancel={() => {
                setTouched(true);
            }}
            maxFiles={1}
            multiple={false}
            validator={(file) => {
                const rejections: FileError[] = [];

                if (file.size > fileSizeLimit) {
                    rejections.push({
                        code: "file-too-large",
                        message: `Provided file size is: ${fileSize(file.size)}. The max upload size is: ${fileSize(fileSizeLimit)}!`
                    });
                }
                if (validTypes.indexOf(file.type) == -1) {
                    rejections.push({
                        code: "file-invalid-type",
                        message: "Invalid file type!"
                    });
                }
                return rejections.length === 0 ? null : rejections;
            }}
            accept={validTypes}
        >
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={`grid w-64 h-64 mx-auto sm:mx-0 border-2 dark:border-dark-700 box-content cursor-pointer`}>
                    <input {...getInputProps()} />
                    <div className={`grid w-full h-full`}>
                        <Preview file={value} />
                    </div>
                </div>
            )}
        </Dropzone>
    );
}
