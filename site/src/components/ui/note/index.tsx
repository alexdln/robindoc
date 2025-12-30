import "./note.scss";

export const Note: React.FC<{ type?: "info"; children: React.ReactNode }> = ({ type = "info", children }) => (
    <div className={`note note_${type}`}>{children}</div>
);
