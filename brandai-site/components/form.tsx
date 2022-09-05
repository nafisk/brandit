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

  let statusColor = 'text-slate-500'
  let statusText = null
  if (!isPromptValid) {
    statusColor = 'text-red-400'
    statusText = `Input must be less than ${characterLimit} characters.`
  }

  return (
    <>
      <div className='mb-6 text-slate-400'>
        <p>
          Tell me what your brand is about and I will generate a snippet and
          keywords for you to use.
        </p>
      </div>

      <input
        className='p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700'
        type='text'
        placeholder='coffee'
        value={prompt}
        onChange={e => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div className={statusColor + ' flex justify-between my-2 mb-4 text-sm'}>
        <div>{statusText}</div>
        <div>
          {prompt.length}/{characterLimit}
        </div>
      </div>
      <button
        className='bg-gradient-to-r from-teal-400 
      to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg'
        onClick={onSubmit}
        disabled={isLoading || !isPromptValid}
      >
        Submit
      </button>
    </>
  )
}

export default Form
