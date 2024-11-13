export const synergyStatuses = [
    {
        name: 'Refused'
    },
    {
        name: 'Live'
    },
    {
        name: 'Pending'
    }
]

export const getStaticSynergyStatus = (index) => {
    const statusIndex = index % 3
    const status = synergyStatuses[statusIndex]

    return status?.name
}