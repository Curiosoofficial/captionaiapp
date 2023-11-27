import TranscriptionItem from "./TranscriptionItem";

export default function TranscriptionEditor({
    awsTranscriptionItems,
    setAwsTranscriptionItems,
}) {

    function updatetranscriptionItem(index, prop, ev) {
        const newAwsItems = [...awsTranscriptionItems];
        newAwsItems[index][prop] = ev.target.value;
        setAwsTranscriptionItems(newAwsItems);
    }

    return (
        <>
         <div className="grid grid-cols-3 sticky top-0 bg-violet-800/80 p-1 rounded-md">
            <div>Start</div>
            <div>End</div>
            <div>Content</div>
          </div>
          {awsTranscriptionItems.length && (
            <div>
              {awsTranscriptionItems.map((item, key) => (
            <div key={key}>
              <TranscriptionItem
                item={item}
                handleStartTimeChange={ev => updatetranscriptionItem(key, 'start_time', ev)}
                handleEndTimeChange={ev => updatetranscriptionItem(key, 'end_time', ev)}
                handleContentChange={ev => updatetranscriptionItem(key, 'content', ev)} 
              />
            </div>
            ))}
            </div>
          )}
        </>
    )
}