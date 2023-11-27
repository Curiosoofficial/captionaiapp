export default function TranscriptionItem({
  item,
  handleStartTimeChange,
  handleEndTimeChange,
  handleContentChange,
}) {
  if (!item) {
    return '';
  }
  return (
    <div className="my-1 grid grid-cols-3 gap-1 items-center">
      <input
        className="bg-white/20 p-1 rounded-md"
        type="number"
        value={item.start_time}
        onChange={handleStartTimeChange}
      />

      <input
        className="bg-white/20 p-1 rounded-md"
        type="number"
        value={item.end_time}
        onChange={handleEndTimeChange}
      />

      <input
        className="bg-white/20 p-1 rounded-md"
        type="text"
        value={item.content}
        onChange={handleContentChange}
      />
    </div>
  );
}
