export default function Loader({props}) {
    return (
        <>
        <div className="overlay"></div>
            <button id="loader" className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status"><h5> {props} </h5></span>
            </button>
        </>
    )
}