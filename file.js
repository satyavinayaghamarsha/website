const ename = document.getElementById("name1");
const entryemail = document.getElementById("email1");
const entrypassword = document.getElementById("ped");
const dobentry = document.getElementById("dobirth");
const enterterms = document.getElementById("accepttheTerms");
const submission = document.getElementById("sub");
const entryhistroy = document.getElementById("dt");
const date = new Date();
let listitems = []
const datValidity = (start_date) => {
    const date_us=start_date.replace("-",".")
    const date_use=date_us.split("-").map((d) => Number(d))
    const yr_dt = (date_use[0] >= (date.getFullYear() - 55) && date_use[0] <= (date.getFullYear() - 18))
    let month_dat;
    let daydate;
    if (date_user[0] === date.getFullYear() - 55) {
        month_dat = date_use[1] >= (date.getMonth() + 1)
        day_date = date_use[2] >= (date.getDate())
    } else if (yr_dt) {
        month_dat = true
        daydate = true
    } else if (date_use[0] === date.getFullYear() - 18) {
        month_dat = date_use[1] <= (date.getMonth() + 1)
        daydate = date_use[2] <= (date.getDate())
    } else {
        month_dat = false
        daydate = false
    }
    finish=yr_dt && month_dat && daydate;
    return finish
}

const isvalid = (element) => {
    return element.validity.valid
}

const digits = (num) => {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    listitems.push(userData)
    localStorage.setItem('userData', JSON.stringify(listitems))
}


submission.addEventListener("click", () => {
    const date_use = dob_entry.value

    if (!datValidity(date_use)) {
        dobentry.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        dobentry.setCustomValidity("")
    }

    const allValid = isvalid(ename) && isvalid(entryemail) && isvalid(entrypassword) && isvalid(dobentry)

    if (allValid) {
        sendStorage(ename.value, entryemail.value, entrypassword.value, dobentry.value, enterterms.checked)
    }
})
const gtStorage = () => {
    listitems = JSON.parse(localStorage.getItem("userData"))
    if (listitems === null) {
        listitems = []
    } else {
        const view = listitems.map((entry) => {
            let rows = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                rows += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${rows}</tr>`
        })
        entryhistroy.innerHTML += view.join("\n")
    }
}



gtStorage()