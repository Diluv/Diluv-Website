import * as React from 'react'
import {useContext, useEffect, useState} from 'react'
import {NextPageContext} from 'next'
import Layout from '../../../../components/Layout'
import {useDropzone} from 'react-dropzone'
import {post} from "../../../../utils/request";
import {API_URL} from "../../../../utils/api";
import {Theme} from "../../../../utils/Contexts";

const sanitizeHtml = require('sanitize-html');
const marked = require('marked');

marked.setOptions({
  sanitize: true,
});

type Props = {
  gameSlug: string
  projectTypesSlug: string
}

type FormData = {
  name: string
  summary: string
  description: string
  logo: File | undefined
  preview: string | undefined
  valid: { name: boolean, summary: boolean, description: boolean }
}

function onSubmit(gameSlug: string, projectTypeSlug: string, formData: FormData) {

  if (formData.logo) {
    console.log(formData);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('summary', formData.summary);
    data.append('description', formData.description);
    data.append('logo', formData.logo);

    post(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}`, data).then(() => {
      console.log('test')
    }).catch(Error => {
      console.log(Error.response?.statusText)
    });
  }
}

function getClass(activeName: string, key: string) {
  const css = "inline-block py-2 px-4 font-bold ";
  if (activeName == key) {
    return css + 'text-diluv-600';
  }

  return css + 'hover:text-white';
}

function ProjectCreatePage({gameSlug, projectTypesSlug}: Props) {
  const [activeTab, setActiveTab] = useState("editor");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    summary: "",
    description: "",
    logo: undefined,
    preview: undefined,
    valid: {name: false, summary: false, description: false}
  });
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles.shift();
      if (file) {
        setFormData({...formData, logo: file, preview: URL.createObjectURL(file)});
      } else {
        //TODO Error
      }
    }
  });

  useEffect(() => () => {
    if (formData.preview)
      URL.revokeObjectURL(formData.preview);
  }, [formData.preview]);
  let theme = useContext(Theme);

  let shadowValid = theme.theme === "dark" ? "shadow-valid-dark" : "shadow-valid-light";
  let shadowInvalid = theme.theme === "dark" ? "shadow-invalid-dark" : "shadow-invalid-light";

  return (
    <Layout title={"Create Project | Diluv"}>
      <div className="container mx-auto">
        <div className="w-full">
          <form className=" rounded px-8 pt-6 pb-8 mb-4">
            <div className="max-w-sm lg:max-w-full lg:flex pb-3">
              <div className="mb-2">
                <label className="inline-block px-4 font-bold text-diluv-700 text-md font-bold mb-2" htmlFor="logo">
                  Logo
                </label>
                <div className="lg:h-40 lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border"
                     style={formData.logo ? {backgroundImage: `url('${formData.preview}'`} : {}}>
                  <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    {!formData.logo ? <p>Click or drop a logo here.</p> : ''}
                  </div>
                </div>
              </div>
              <div className="px-4 flex flex-col justify-between leading-normal w-1/2">
                <div className="mb-2">
                  <label className="block text-diluv-700 text-md font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className={"shadow appearance-none border rounded w-full py-2 px-3 text-diluv-700 leading-tight focus:outline-none focus:shadow-outline " + (formData.valid.name ? "focus:shadow-valid " + shadowValid : "focus:shadow-invalid " + shadowInvalid)}
                    id="name" type="text" placeholder="Name"
                    minLength={5}
                    maxLength={50}
                    onChange={event => {
                      const minLength = event.target.minLength;
                      const maxLength = event.target.maxLength;
                      setFormData({
                        ...formData,
                        name: event.target.value,
                        valid: {...formData.valid, name: new RegExp('^.{' + minLength + ',' + maxLength + '}$').test(event.target.value)}
                      })
                    }}
                    value={formData.name}/>
                </div>
                <div className="mb-2">
                  <label className="block text-diluv-700 text-md font-bold mb-2" htmlFor="summary">
                    Summary
                  </label>
                  <input
                    className={"shadow appearance-none border rounded w-full py-2 px-3 text-diluv-700 leading-tight focus:outline-none focus:shadow-outline " + (formData.valid.summary ? "focus:shadow-valid " + shadowValid : "focus:shadow-invalid " + shadowInvalid)}
                    id="summary" type="text" placeholder="Summary"
                    minLength={10}
                    maxLength={250}
                    onChange={event => {
                      const minLength = event.target.minLength;
                      const maxLength = event.target.maxLength;
                      setFormData({
                        ...formData, summary: event.target.value,
                        valid: {...formData.valid, summary: new RegExp('^.{' + minLength + ',' + maxLength + '}$').test(event.target.value)}
                      })
                    }}
                    value={formData.summary}
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <ul className="flex justify-end">
                <li className="-mb-px mr-1 mr-auto">
                  <label className="inline-block py-2 pr-4 font-bold text-diluv-700 " htmlFor="description">
                    Description
                  </label>
                </li>
                <li className="-mb-px mr-1 cursor-pointer">
                  <a className={getClass(activeTab, "editor")} onClick={_ => setActiveTab('editor')}>Editor</a>
                </li>
                <li className="-mb-px mr-1 cursor-pointer">
                  <a className={getClass(activeTab, "both")} onClick={_ => setActiveTab('both')}>Both</a>
                </li>
                <li className="-mb-px mr-1 cursor-pointer">
                  <a className={getClass(activeTab, "preview")} onClick={_ => setActiveTab('preview')}>Preview</a>
                </li>
              </ul>

              <div className="flex -mr-4 w-full">
                {
                  (activeTab == "editor" || activeTab == "both") &&
                  <textarea id="description"
                            className={"flex-1 shadow appearance-none rounded py-2 px-3 text-diluv-700 mb-3 mr-4 leading-tight overflow-x-auto whitespace-pre h-full " + (formData.valid.description ? "focus:shadow-valid " + shadowValid : "focus:shadow-invalid " + shadowInvalid)}
                            minLength={50}
                            maxLength={1000}
                            onChange={event => {
                              const minLength = event.target.minLength;
                              const maxLength = event.target.maxLength;
                              setFormData({
                                ...formData,
                                description: event.target.value,
                                valid: {
                                  ...formData.valid,
                                  description: new RegExp('^.{' + minLength + ',' + maxLength + '}$').test(event.target.value)
                                }
                              })

                            }}
                            value={formData.description}/>
                }
                {
                  (activeTab == "preview" || activeTab == "both") &&
                  <div dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(formData.description))}}
                       className="flex-1 shadow appearance-none rounded py-2 px-3 text-diluv-700 mb-3 mr-4 leading-tight overflow-x-auto">
                  </div>
                }
              </div>

            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.valid.name || !formData.valid.summary || !formData.valid.description || !formData.logo}
                type="button"
                onClick={_ => onSubmit(gameSlug, projectTypesSlug, formData)}
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

ProjectCreatePage.getInitialProps = async ({query}: NextPageContext) => {
  const {game_slug, project_types_slug} = query;
  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;
  return {gameSlug, projectTypesSlug};
};

export default ProjectCreatePage
