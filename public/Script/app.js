// Immediately invoked function expression, 'start' runs once the page is fully loaded, uses EventListener function
(function(){
    function start(){
        console.log("App started...")
    }
    window.addEventListener("load",start);
})();