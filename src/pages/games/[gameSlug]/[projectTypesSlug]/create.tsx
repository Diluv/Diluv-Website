import React, { useContext, useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { useDropzone } from 'react-dropzone';
import Layout from '../../../../components/Layout';
import { post } from '../../../../utils/request';
import { API_URL } from '../../../../utils/api';
import { Theme } from '../../../../utils/context';
import { ColouredDrop } from '../../../../components/Drop';

const sanitizeHtml = require('sanitize-html');
const marked = require('marked');

marked.setOptions({
  sanitize: true,
});

type Props = {
  gameSlug: string
  projectTypesSlug: string
};

type FormData = {
  name: string
  summary: string
  description: string
  logo: File | undefined
  preview: string | undefined
  valid: { name: boolean, summary: boolean, description: boolean }
};

function onSubmit(gameSlug: string, projectTypeSlug: string, formData: FormData) {
  if (formData.logo) {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('summary', formData.summary);
    data.append('description', formData.description);
    data.append('logo', formData.logo);

    post(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}`, data).then(() => {
      // eslint-disable-next-line no-console
      console.log('test');
    }).catch((Error) => {
      // eslint-disable-next-line no-console
      console.log(Error.response?.statusText);
    });
  }
}

function getClass(activeName: string, key: string) {
  const css = 'inline-block py-2 px-4 font-bold';
  if (activeName === key) {
    return `${css} text-diluv-600`;
  }

  return `${css} hover:text-white`;
}

function hashCode(str: string) { // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number) {
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

function ProjectCreatePage({ gameSlug, projectTypesSlug }: Props) {
  const [activeTab, setActiveTab] = useState('editor');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    summary: '',
    description: '',
    logo: undefined,
    preview: undefined,
    valid: { name: false, summary: false, description: false },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles.shift();
      if (file) {
        setFormData({ ...formData, logo: file, preview: URL.createObjectURL(file) });
      } else {
        // TODO Error
      }
    },
  });

  useEffect(() => () => {
    if (formData.preview) URL.revokeObjectURL(formData.preview);
  }, [formData.preview]);
  const theme = useContext(Theme);

  const shadowValid = theme.theme === 'dark' ? 'shadow-valid-dark' : 'shadow-valid-light';
  const shadowInvalid = theme.theme === 'dark' ? 'shadow-invalid-dark' : 'shadow-invalid-light';

  return (
    <Layout title="Create Project | Diluv">
      <div className="container mx-auto">
        <div className="w-full">
          <form className=" rounded px-8 pt-6 pb-8 mb-4">
            <div className="max-w-sm lg:max-w-full lg:flex pb-3">
              <div className="mb-2">
                <label className="inline-block font-bold text-diluv-700 text-md font-bold mb-2" htmlFor="logo">
                  Logo

                  <div
                    className="lg:h-40 lg:w-40 flex-none bg-cover text-center text-diluv-200 hover:text-white overflow-hidden cursor-pointer
                  bg-blue-700 hover:bg-blue-500"
                    style={formData.logo ? { backgroundImage: `url('${formData.preview}'` } : {}}
                  >
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      {!formData.logo
                        ? (
                          <div>
                            <span className="text-sm">Click or drop a logo here</span>
                            <ColouredDrop
                              className="mx-auto"
                              height="8rem"
                              width="8rem"
                              style={{ fill: `#${intToRGB(hashCode(formData.name))}` }}
                            />
                          </div>
                        ) : ''}
                    </div>
                  </div>
                </label>
              </div>
              <div className="px-4 flex flex-col justify-between leading-normal w-1/2">
                <div className="mb-2">
                  <label className="block text-diluv-700 text-md font-bold mb-2" htmlFor="name">
                    Name

                    <input
                      className={`focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black 
                    ${formData.valid.name ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                      id="name"
                      type="text"
                      placeholder="Name"
                      minLength={5}
                      maxLength={50}
                      onChange={(event) => {
                        const { minLength } = event.target;
                        const { maxLength } = event.target;
                        setFormData({
                          ...formData,
                          name: event.target.value,
                          valid: { ...formData.valid, name: new RegExp(`^.{${minLength},${maxLength}}$`).test(event.target.value) },
                        });
                      }}
                      value={formData.name}
                    />
                  </label>
                </div>
                <div className="mb-2">
                  <label className="block text-diluv-700 text-md font-bold mb-2" htmlFor="summary">
                    Summary
                    <input
                      className={`focus:outline-none focus:shadow-outline border border-gray-300 mt-3 py-2 px-4 block w-full text-black
                     ${formData.valid.summary ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                      id="summary"
                      type="text"
                      placeholder="Summary"
                      minLength={10}
                      maxLength={250}
                      onChange={(event) => {
                        const { minLength } = event.target;
                        const { maxLength } = event.target;
                        setFormData({
                          ...formData,
                          summary: event.target.value,
                          valid: { ...formData.valid, summary: new RegExp(`^.{${minLength},${maxLength}}$`).test(event.target.value) },
                        });
                      }}
                      value={formData.summary}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <ul className="flex justify-end">
                <li className="-mb-px mr-1 mr-auto">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="inline-block py-2 pr-4 font-bold text-diluv-700 " htmlFor="description">
                    Description
                  </label>
                </li>
                <li className="-mb-px mr-1 cursor-pointer">
                  <button type="button" className={getClass(activeTab, 'editor')} onClick={() => setActiveTab('editor')}>Editor</button>
                </li>
                <li className="-mb-px mr-1 cursor-pointer">
                  <button type="button" className={getClass(activeTab, 'both')} onClick={() => setActiveTab('both')}>Both</button>
                </li>
                <li className="-mb-px mr-1 cursor-pointer">
                  <button type="button" className={getClass(activeTab, 'preview')} onClick={() => setActiveTab('preview')}>Preview</button>
                </li>
              </ul>

              <div className="flex -mr-4 w-full">
                {
                  (activeTab === 'editor' || activeTab === 'both')
                  && (
                    <textarea
                      id="description"
                      className={`flex-1 overflow-y-scroll overflow-x-hidden overflow-scroll focus:outline-none focus:shadow-outline border 
                      border-gray-300 mt-3 py-2 px-4 block w-full text-black whitespace-pre h-64 
                      ${formData.valid.description ? `focus:shadow-valid ${shadowValid}` : `focus:shadow-invalid ${shadowInvalid}`}`}
                      minLength={50}
                      maxLength={1000}
                      onChange={(event) => {
                        const { minLength } = event.target;
                        const { maxLength } = event.target;
                        setFormData({
                          ...formData,
                          description: event.target.value,
                          valid: {
                            ...formData.valid,
                            description: new RegExp(`^.{${minLength},${maxLength}}$`).test(event.target.value),
                          },
                        });
                      }}
                      value={formData.description}
                    />
                  )
                }
                {
                  (activeTab === 'preview' || activeTab === 'both')
                  && (
                    <div
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked(formData.description)) }}
                      className="flex-1 shadow appearance-none rounded py-2 px-3 text-diluv-700 mb-3 mr-4 leading-tight overflow-x-auto"
                    />
                  )
                }
              </div>

            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-700 disabled:bg-diluv-700 hover:bg-blue-500 text-diluv-200 hover:text-white font-bold py-2 px-4 duration-200
                 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.valid.name || !formData.valid.summary || !formData.valid.description || !formData.logo}
                type="button"
                onClick={() => onSubmit(gameSlug, projectTypesSlug, formData)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

ProjectCreatePage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug } }: NextPageContext) => ({ gameSlug, projectTypesSlug });

export default ProjectCreatePage;
