interface FormProps {
  prompt: string
  setPrompt: any
  onSubmit: any
  isLoading: boolean
  characterLimit: number
}

const Form: React.FC<FormProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  characterLimit,
  isLoading,
}) => {
  const isPromptValid = prompt.length <= characterLimit
  const updatePromptValue = (text: string) => {
    if (text.length <= characterLimit) {
      setPrompt(text)
    }
  }

  return (
    <div>
      <p>Generate your branding keywords for your company</p>
      <input
        type='text'
        placeholder='coffee'
        onChange={e => setPrompt(e.currentTarget.value)}
        value={prompt}
      ></input>
      <div>
        {prompt.length}/{characterLimit}
      </div>
      <button onClick={onSubmit} disabled={isLoading || !isPromptValid}>
        Submit
      </button>
    </div>
  )
}

export default Form
