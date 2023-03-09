export default function BoardDetail({curBoard}) {
    return (
        <div>
            {curBoard.name}
            {curBoard.description}
        </div>
    )
}