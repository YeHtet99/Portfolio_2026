import '@testing-library/jest-dom'
class IntersectionObserverMock { observe() {} unobserve() {} disconnect() {} }
globalThis.IntersectionObserver = IntersectionObserverMock
globalThis.ResizeObserver = IntersectionObserverMock
window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }))
