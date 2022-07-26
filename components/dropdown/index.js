import React, { useState } from "react";
import Link from "next/link";
import { usePopper } from "react-popper";
import { Card, CardBody, Collapse } from "reactstrap";
import { BiCaretDown } from "react-icons/bi";

const Dropdown = ({ navItemData }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [-30, 10] } },
    ],
  });
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ width: "300px" }}
      >
        <Link href={navItemData.navLink}>
          <a>{navItemData.title}</a>
        </Link>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          ref={setReferenceElement}
        >
          <BiCaretDown />
        </button>
      </div>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <Collapse isOpen={collapse}>
          <Card>
            <CardBody>
              {navItemData.children.map((navItem, index) => (
                <Link href={navItem.navLink} key={index}>
                  <a>{navItem.title}</a>
                </Link>
              ))}
              <div ref={setArrowElement} style={styles.arrow} />
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </>
  );
};

export default Dropdown;
