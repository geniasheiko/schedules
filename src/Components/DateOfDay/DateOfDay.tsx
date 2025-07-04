
type DateOfDayPropsType = {
    selectedWeek: string | null;
}

export const DateOfDate = ({ selectedWeek }: DateOfDayPropsType) => {
    return (
    <>
        <p>
            Тиждень від:{" "}
            {selectedWeek &&
                new Date(selectedWeek).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
        </p>
    </>
    )
}