import { useState } from 'react'
import Form from './form'
import Result from './result'
import brandaiLogo from '../public/brandaiLogo.svg'
import Image from 'next/image'

const BrandAI: React.FC = () => {
  const CHARACTER_LIMIT = 32
  const ENDPOINT: string =
    'https://fmhqi0y9i0.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords'
  const [prompt, setPrompt] = useState('')
  const [snippet, setSnippet] = useState('')
  const [keywords, setKeywords] = useState([])
  const [hasResult, setHasResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    console.log('Submitting: ' + prompt)
    setIsLoading(true)
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then(res => res.json())
      .then(onResult)
  }

  const onResult = (data: any) => {
    setSnippet(data.snippet)
    setKeywords(data.keywords)
    setHasResult(true)
    setIsLoading(false)
  }

  const onReset = () => {
    setPrompt('')
    setHasResult(false)
    setIsLoading(false)
  }

  let displayedElement = null
  if (hasResult) {
    displayedElement = (
      <Result
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    )
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    )
  }

  const gradientTextStyle =
    'text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto'

  return (
    <div className='h-screen flex'>
      <div className='max-w-md m-auto p-2'>
        <div className='bg-slate-800 p-6 rounded-md text-white'>
          <div className='text-center my-6'>
            <Image src={brandaiLogo} width={42} height={42} alt='/' />
            <h1 className={gradientTextStyle + ' text-3xl font-bold'}>
              BRANDIT
            </h1>
            <div className={gradientTextStyle}>Your AI branding assistant</div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  )
}

export default BrandAI
