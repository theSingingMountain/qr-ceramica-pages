export default function ButtonGroup({ next, previous, goToSlide, ...rest}) {
    const { currentSlide } = rest;
    return (
        <div className="carousel-button-group">
        <button type="button" className={`btn btn-outline-secondary ${currentSlide === 0 ? 'disable' : ''}`} onClick={() => previous()}>{<img src="/arrow-left.svg" />}</button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => next()}>{<img src="/arrow-right.svg"/>}</button>
        </div>
    )
}