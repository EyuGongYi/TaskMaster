export default interface AssignmentAlert{
    type: "Assignment" | "Announcement",
    message: string,
    deadline?: string
} 