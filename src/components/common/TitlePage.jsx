export default function TitlePage({ children }) {
    return (
        <div className="align-middle">
            <h1 className="d-flex justify-content-center display-4 " style={{ textAlign: "center", marginBottom: "5%" }}>{children}</h1>
        </div>
    )
}