import randomBlue from '../helpers/randomBlue';

const formatObjChart = ({ data = {}, dataLabel = '', singleColor = false }) => {

    let dataChart = {}
    const labels = Object.keys(data)
    const values = Object.values(data)
    let counter = 1
    let colors = ['#2196F3']

    if (!singleColor) {
        colors.length = 0
        for (let value of values) {
            colors.push(randomBlue('#2196F3', counter * 12))
            counter++
        }
    }

    let datasets = [{
        label: dataLabel,
        data: values,
        backgroundColor: colors
    }]

    dataChart['labels'] = labels
    dataChart['datasets'] = datasets
    dataChart['colors'] = []

    return dataChart
}

export default formatObjChart