export class Snapshot {
  constructor(element) {
    this.element = element
  }

  get activeElement() {
    return this.element.ownerDocument.activeElement
  }

  get children() {
    return [...this.element.children]
  }

  hasAnchor(anchor) {
    return this.getElementForAnchor(anchor) != null
  }

  getElementForAnchor(anchor) {
    return anchor ? this.element.querySelector(`[id='${anchor}'], a[name='${anchor}']`) : null
  }

  get isConnected() {
    return this.element.isConnected
  }

  get firstAutofocusableElement() {
    const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])"

    for (const element of this.element.querySelectorAll("[autofocus]")) {
      if (element.closest(inertDisabledOrHidden) == null) return element
      else continue
    }

    return null
  }

  get permanentElements() {
    return queryPermanentElementsAll(this.element)
  }

  getPermanentElementById(id) {
    return getPermanentElementById(this.element, id)
  }

  getPermanentElementMapForSnapshot(snapshot) {
    const permanentElementMap = {}

    for (const currentPermanentElement of this.permanentElements) {
      const { id } = currentPermanentElement
      const newPermanentElement = snapshot.getPermanentElementById(id)
      if (newPermanentElement) {
        permanentElementMap[id] = [currentPermanentElement, newPermanentElement]
      }
    }

    return permanentElementMap
  }
}

export function getPermanentElementById(node, id) {
  return node.querySelector(`#${id}[data-turbo-permanent]`)
}

export function queryPermanentElementsAll(node) {
  return node.querySelectorAll("[id][data-turbo-permanent]")
}
