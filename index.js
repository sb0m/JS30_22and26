const highlightSpan = document.createElement('span');

/**
 * Must still be resized when window gets resized
 */
window.onload = function () {
    const links = document.querySelectorAll('p > a');
    const nav = document.querySelector('nav');

    // create a span to highlight the nearest link to the mouse pointer
    highlightSpan.classList.add('highlight');
    links.forEach(link => link.addEventListener('mouseenter', highlightLink));
    document.body.insertBefore(highlightSpan, nav);

    /**
     * Step 2: wenn man die navigation links hovered, wird ein Menue element auf
     * gehen (animiert), gleiche vorgenensweise wie die links, die markiert werden
     */
    const navLinks = document.querySelectorAll('ul > li');
    const background = document.querySelector('.dropdown');
    const dropdownBackground = document.querySelector('.dropdownBackground');

    navLinks.forEach(link => link.addEventListener('mouseenter', function () { handleEnter(link, dropdownBackground) }));
    navLinks.forEach(link => link.addEventListener('mouseleave', function () { handleLeave(link, dropdownBackground) }));
    navLinks.forEach(link => setDropdownPosition(link));
}

function handleLeave(link, dropdownBackground) {
    const dropdown = link.querySelector('.dropdown');

    link.classList.remove("trigger-enter");
    dropdown.classList.add("hide");
    setTimeout(() => link.classList.remove("trigger-enter-active", "hide"), 150);
    dropdownBackground.classList.remove("open");
    dropdownBackground.style.setProperty('height', `0px`);
}

function handleEnter(link, dropdownBackground) {
    // in der arrow function bleibt das this einfach so erhalten (anders in anonymer Funktion, da is es das Elternelement wiedre)
    // classes like trigger enter und trigger enter active die nacheinander display und opacity anschalten:
    // so machts react und angular auch, um eine schöne transition zu definieren
    const dropdown = link.querySelector('.dropdown');

    link.classList.add("trigger-enter");
    dropdown.classList.remove("hide");
    setTimeout(() => link.classList.contains("trigger-enter") && link.classList.add("trigger-enter-active"), 150);
    dropdownBackground.classList.add("open");

    positioningDropdownBackground(dropdown, dropdownBackground);
}

function positioningDropdownBackground(dropdown, dropdownBackground) {
    const dropDownCoords = dropdown.getBoundingClientRect();

    dropdownBackground.style.setProperty('width', `${dropDownCoords.width}px`);
    dropdownBackground.style.setProperty('height', `${dropDownCoords.height}px`);
    dropdownBackground.style.left = dropDownCoords.left;
    dropdownBackground.style.top = dropDownCoords.top + 20;
};

function highlightLink(e) {
    const linkCoords = e.target.getBoundingClientRect();
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top,
        left: linkCoords.left
    }

    highlightSpan.style.height = `${coords.height} `;
    highlightSpan.style.width = `${coords.width} `;
    highlightSpan.style.transform = `translate(${coords.left}px, ${coords.top}px) `;
}

/**
 * To find out the right dropdown position the dropdown has to be unhidden (NO diplsy: hide),
 * otherwise it doesn't have height/width
 */
function setDropdownPosition(link) {
    /** !!!!!!!!!!!!!!!!!!!!!
     * there is differences between the css file and element.style.something!!!!!!!!! and computed values probably as well
     */
    const dropdown = link.querySelector('.dropdown');
    const liCoords = link.getBoundingClientRect();
    const dropdownCoords = dropdown.getBoundingClientRect();
    const centerOfLi = liCoords.left + (liCoords.width / 2);

    dropdown.style.left = centerOfLi - (dropdownCoords.width / 2);
    dropdown.classList.add("hide");
}