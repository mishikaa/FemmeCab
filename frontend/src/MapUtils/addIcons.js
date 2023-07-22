const coordinates1 = [78.114542, 26.200635]
const coordinates2 = [78.235895, 26.216704]
const coordinates3 = [78.156601, 26.260616]
const coordinates4 = [78.184301, 26.298829]
const coordinates5 = [78.173619, 26.260536]
const coordinates6 = [78.169245, 26.233050]

function getRandomInRange(from, to) {
    return (Math.random() * (to - from).toFixed(5) + from) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
const addCarIcons = [{
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates3[0], coordinates4[0]),coordinates3[1], coordinates4[1]]
                    }
                  },
                  {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates1[0], coordinates2[0]),coordinates1[1], coordinates2[1]]
                    }
                  },
                  {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates1[0], coordinates3[0]),coordinates1[1], coordinates3[1]]
                    }
                  },
                  {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates1[0], coordinates2[0]),coordinates1[1], coordinates2[1]]
                    }
                  },
                  {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates2[0], coordinates4[0]),coordinates2[1], coordinates4[1]]
                    }
                  },
                  {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates6[0], coordinates4[0]),coordinates6[1], coordinates4[1]]
                    }
                  },
                  {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Point',
                    'coordinates': [getRandomInRange(coordinates1[0], coordinates5[0]),coordinates1[1], coordinates5[1]]
                    }
                  }
                ]

export default addCarIcons;