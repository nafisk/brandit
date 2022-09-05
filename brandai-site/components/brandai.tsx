import { useState } from 'react'
import Form from './form'
import Result from './result'

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

  return (
    <>
      <h1>Branditt!</h1>
      {displayedElement}
    </>
  )
}

export default BrandAI
