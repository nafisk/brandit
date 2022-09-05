interface ResultProps {
  prompt: string
  snippet: string
  keywords: string[]
  onBack: any
}

const Result: React.FC<ResultProps> = ({
  snippet,
  keywords,
  onBack,
  prompt,
}) => {
  const keywordElements = []
  for (let i = 0; i < keywords.length; i++) {
    const element = <div key={i}>#{keywords[i]}</div>
    keywordElements.push(element)
  }

  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt</b>
          </div>
          <div>{prompt}</div>
        </div>

        <div>
          <div>
            <b>Snippet</b>
          </div>
          <div>{snippet}</div>
        </div>

        <div>
          <div>
            <b>Keywords</b>
          </div>
          <div>{keywordElements}</div>
        </div>
      </div>

      <button onClick={onBack}>Back</button>
    </>
  )
}

export default Result
