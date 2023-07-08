function booking() {
    const options = document.querySelectorAll('.booking__option');

    // Animation responsible for tilting the div towards the mouse
    options.forEach(option => {
      option.addEventListener('mousemove', event => {
        const centerX = option.offsetWidth / 2;
        const centerY = option.offsetHeight / 2;
        const mouseX = event.offsetX - centerX;
        const mouseY = event.offsetY - centerY;
        const maxRotation = 20;
    
        const rotateX = -mouseY / centerY * maxRotation;
        const rotateY = mouseX / centerX * maxRotation;
    
        option.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    
      option.addEventListener('mouseout', () => {
        option.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      });
    });
}

export default booking