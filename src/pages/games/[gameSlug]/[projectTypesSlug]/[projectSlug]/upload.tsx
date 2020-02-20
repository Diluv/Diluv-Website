import React, { useContext, useState } from 'react';
import { NextPageContext } from 'next';
import { useDropzone } from 'react-dropzone';
import Layout from '../../../../../components/Layout';
import { post } from '../../../../../utils/request';
import { API_URL } from '../../../../../utils/api';
import { Theme } from '../../../../../utils/context';

type Props = {
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
};

type FormData = {
  changelog: string
  file: File | undefined
  validChangelog: boolean
};

function onSubmit(gameSlug: string, projectTypeSlug: string, projectSlug: string, formData: FormData) {
  if (formData.file) {
    const data = new FormData();
    data.append('changelog', formData.changelog);
    data.append('file', formData.file);

    post(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}/files`, data).then(() => {
    }).catch((Error) => {
      // eslint-disable-next-line no-console
      console.log(Error.response?.statusText);
    });
  }
}

function ProjectUploadFilePage({ gameSlug, projectTypesSlug, projectSlug }: Props) {
  const [formData, setFormData] = useState<FormData>({
    changelog: '',
    file: undefined,
    validChangelog: false,
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles.shift();
      if (file) {
        setFormData({ ...formData, file });
      } else {
        // TODO Error
      }
    },
  });

  const theme = useContext(Theme);

  const shadowValid = theme.theme === 'dark' ? 'shadow-valid-dark' : 'shadow-valid-light';
  const shadowInvalid = theme.theme === 'dark' ? 'shadow-invalid-dark' : 'shadow-invalid-light';

  return (
    <Layout title="Upload Project File | Diluv">
      <div className="container mx-auto">
        <h2 className="flex-grow text-center text-4xl font-bold pb-2">Upload File</h2>

        <div className="w-full">
          <form className="rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-2">
              <label className="inline-block px-4 font-bold text-diluv-700 text-md font-bold mb-2" htmlFor="logo">
                File
                <div className="lg:h-40 lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    {!formData.file ? <p>Click or drop a logo here.</p> : ''}
                  </div>
                </div>
              </label>
            </div>

            <div className="max-w-sm lg:max-w-full pb-3">
              <div className="px-4 leading-normal">
                <div className="mb-2">
                  <label className="block text-diluv-700 text-md font-bold mb-2" htmlFor="changelog">
                    Changelog

                    <textarea
                      id="description"
                      className={`w-full shadow appearance-none rounded py-2 px-3 text-diluv-700 mb-3 mr-4 leading-tight overflow-x-auto
                       whitespace-pre ${formData.validChangelog ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                      minLength={50}
                      maxLength={1000}
                      onChange={(event) => {
                        const { minLength } = event.target;
                        const { maxLength } = event.target;
                        setFormData({
                          ...formData,
                          changelog: event.target.value,
                          validChangelog: new RegExp(`^.{${minLength},${maxLength}}$`).test(event.target.value),
                        });
                      }}
                      value={formData.changelog}
                    />
                  </label>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-700 disabled:bg-diluv-700 hover:bg-blue-500 text-diluv-200 hover:text-white font-bold p-2 duration-200 ease-in
              disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.validChangelog || !formData.file}
              type="button"
              onClick={() => onSubmit(gameSlug, projectTypesSlug, projectSlug, formData)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

ProjectUploadFilePage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug, projectSlug } }: NextPageContext) => {
  // TODO Check for permissions
  const permissions = '';
  return {
    gameSlug, projectTypesSlug, projectSlug, permissions,
  };
};

export default ProjectUploadFilePage;
