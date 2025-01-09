document.addEventListener('DOMContentLoaded', function(){

    async function getData(url, apiKey)
    {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching data: ', error)
            throw error
        }
    }

    async function deleteMember(url, apiKey, email)
    {
        try {
            const response = await fetch(`${url}/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        } catch (error) {
            console.error('Error deleting data: ', error)
            throw error
        }
    }

    async function populatePreCancel()
    {
        const data = await getData('../members', '613d7984-a0ee-4558-b026-9882ac5a97a6')
        await insertHtmlPreCancel(data)
        await insertHtmlCanceled(data)
        await insertNumbers(data)
    }

    async function insertNumbers(data)
    {
        let activeCount = 0
        let preCanceledCount = 0
        let canceledCount = 0
        for (const member of data.members) {
            const daysLeft = calculateDateDistance(member.renewal_date)
            if (member.canceled && daysLeft >= 0) {
                preCanceledCount += 1
            } else if (member.canceled && daysLeft < 0 || member.failed_payment) {
                canceledCount += 1
            }  else if (!member.canceled && !member.failed_payment && daysLeft >= 0) {
                activeCount += 1
            }
        }

        const activeSubs = document.getElementById("activesubs")
        const preCanceledSubs = document.getElementById("precanceledsubs")
        const canceledSubs = document.getElementById("canceledsubs")

        activeSubs.textContent = activeCount
        preCanceledSubs.textContent = preCanceledCount
        canceledSubs.textContent = canceledCount
    }

    async function insertHtmlPreCancel(data)
    {
        const sortedMembers = data.members.sort((a, b) => {
            const dateA = new Date(a.renewal_date)
            const dateB = new Date(b.renewal_date)
        })
        const precancelContainer = document.getElementById("precanceled")
        precancelContainer.innerHTML = ''
        for (const member of sortedMembers) {
            const daysLeft = calculateDateDistance(member.renewal_date)
            if (member.canceled && daysLeft >= 0) {
                precancelContainer.innerHTML += `
                    <div id="${member.email}" class="flex justify-between bg-userContainer userborder rounded-lg p-2">
                        <div class="flex gap-4 w-80">
                            <img src="/static/img/@.svg" class="select-none h-6">
                            <span class="text-white text-base font-regular">${member.email}</span>
                        </div>
                        <div class="flex gap-4 w-48">
                            <img src="/static/img/status.svg" class="select-none h-6">
                            <span class="user-status text-gold text-base font-semibold">${daysLeft}d left</span>
                        </div>
                        <img src="/static/img/trash2.svg" class="h-6 select-none cursor-pointer pc-delete-btn">
                    </div>
                `
            }
        }

        const preCancelDelBtns = document.querySelectorAll('.pc-delete-btn')
        preCancelDelBtns.forEach(e => {
            e.addEventListener('click', function(){
                showPopUp()
                popUp(e)
            })
        })
    }
    async function insertHtmlCanceled(data)
    {
        const cancelContainer = document.getElementById("alrcanceled")
        cancelContainer.innerHTML = ''
        const sortedMembers = data.members.sort((a, b) => {
            const dateA = new Date(a.renewal_date)
            const dateB = new Date(b.renewal_date)
        })
        for (const member of sortedMembers) {
            const daysLeft = calculateDateDistance(member.renewal_date)
            let status = ''
            if (member.failed_payment) {
                status = 'Failed Payment'
            } else if (member.canceled && daysLeft < 0) {
                status = `${daysLeft}d ago`
            }
            if (member.canceled && daysLeft < 0 || member.failed_payment) {
                cancelContainer.innerHTML += `
                    <div id="${member.email}" class="flex justify-between bg-userContainer userborder rounded-lg p-2">
                        <div class="flex gap-4 w-80">
                            <img src="/static/img/@.svg" class="select-none h-6">
                            <span class="text-white text-base font-regular">${member.email}</span>
                        </div>
                        <div class="flex gap-4 w-80">
                            <img src="/static/img/status.svg" class="select-none h-6">
                            <span class="user-status text-mainRed text-base font-semibold">${status}</span>
                        </div>
                        <img src="/static/img/trash.svg" class="c-delete-btn h-6 select-none cursor-pointer">
                    </div>
                `
            }
        }

        const cancelDelBtns = document.querySelectorAll('.c-delete-btn')
        cancelDelBtns.forEach(e => {
            e.addEventListener('click', function(){
                showPopUp()
                popUp(e)
            })
        })
    }

    populatePreCancel()


    function calculateDateDistance(targetDate) {
        const currentDate = new Date()
        const target = new Date(targetDate)

        const diffInMs = target - currentDate
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

        return diffInDays
    }

    let boundFunction

    function popUp(element) {
        const user = element.parentElement
        const email = user.id

        const userStatus = user.querySelector('.user-status').textContent

        let color = ''
        let trashpath = ''
        if (element.classList.contains('pc-delete-btn')) {
            color = 'text-gold'
            trashpath = '/static/img/trash2.svg'
        } else if (element.classList.contains('c-delete-btn')) {
            color = 'text-mainRed'
            trashpath = '/static/img/trash.svg'
        }
        console.log(`clicked delete on: ${email}`)
        const popupSubmit = document.getElementById("popup-submit")
        boundFunction = deleteUser.bind(null, email)
        popupSubmit.addEventListener('click', boundFunction)
        
        const popupUserContainer = document.getElementById('pop-up-user-container')
        popupUserContainer.innerHTML = `
            <div class="flex justify-between bg-userContainer userborder rounded-lg p-2">
                <div class="flex gap-4 w-80">
                    <img src="/static/img/@.svg" class="select-none h-6">
                    <span id="popup-email" class="text-white text-base font-regular">${email}</span>
                </div>
                <div class="flex gap-4 w-80">
                    <img src="/static/img/status.svg" class="select-none h-6">
                    <span id="popup-status" class="${color} text-base font-semibold">${userStatus}</span>
                </div>
                <img src="${trashpath}" class="c-delete-btn h-6 select-none cursor-pointer">
            </div>
        `
    }

    // POPUP-CANCEL LISTENER
    const popupCancel = document.getElementById("popup-cancel")
    popupCancel.addEventListener('click', function(){
        const popup = document.getElementById("popup")
        const overlay = document.getElementById("overlay")
        popup.classList.add('opacity-0')
        popup.classList.add('pointer-events-none')
        overlay.classList.add('opacity-0')
    })

    function showPopUp()
    {
        const popup = document.getElementById("popup")
        const popupSubmit = document.getElementById("popup-submit")
        const overlay = document.getElementById("overlay")

        popup.classList.remove('opacity-0')
        popup.classList.remove('pointer-events-none')
        overlay.classList.remove('opacity-0')
        
        popupSubmit.removeEventListener('click', boundFunction)
    }

    async function deleteUser(email)
    {
        console.log(`delete user ${email}`)

        try {
            await deleteMember('../members/delete', '613d7984-a0ee-4558-b026-9882ac5a97a6', email)
            populatePreCancel()
        } catch (error) {
            console.error('Error performing: ', error)
        }
        
        
        // HIDING POPUP
        const popup = document.getElementById("popup")
        const overlay = document.getElementById("overlay")
        popup.classList.add('opacity-0')
        popup.classList.add('pointer-events-none')
        overlay.classList.add('opacity-0')
    }
})