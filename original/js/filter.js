let form = document.getElementById("filterForm");

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let e = document.getElementById("selectPrice")
    let price = e.options[e.selectedIndex].value
    e = document.getElementById("selectArea")
    area = e.options[e.selectedIndex].value
    e = document.getElementById("selectDistance")
    distance = e.options[e.selectedIndex].value
    e = document.getElementById("selectBed")
    bed = e.options[e.selectedIndex].value
    e = document.getElementById("selectBath")
    bath = e.options[e.selectedIndex].value
    e = document.getElementById("selectBoba")
    let boba = e.options[e.selectedIndex].value

    let data = {
        "price": price,
        "area": area,
        "distance": distance,
        "bed": bed,
        "bath": bath,
        "boba": boba
    }

    console.log(data)
})