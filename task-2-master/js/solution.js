(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        // todo: подсчитать кол-во островов на карте
        var land = [];
        for(var y = 0; y < map.length; y++) {
            for(var x = 0; x < map.length; x++) {
                if (map[y][x]){
                    var coordinates = {
                        'y' : y,
                        'x' : x
                    };
                    land.push(coordinates);
                }
            }
        }
        var islandsCounter=0;
        var currentGroup = [];
        var checkForNeighbours = [];
        for (var i = 0; i < land.length; i++){
            var currentIsland = land[i];
            if(currentIsland){
                islandsCounter++;
                isAGroupOfIslands(currentIsland, land, checkForNeighbours, currentGroup);
                removeIslandGroupFromList(currentGroup, land);
                currentGroup = [];
                checkForNeighbours = [];
            }
        }

        function removeIslandGroupFromList(currentGroup, land) {
            for(var j = 0; j < currentGroup.length; j++){
                var islandIndex = indexObjectInArray(currentGroup[j], land);
                if(islandIndex){
                    land[islandIndex] = null;
                }
            }
            return land;

        }

        function addIslandToGroup(island, currentGroup) {
            var isInGroup = (indexObjectInArray(island, currentGroup)).length;
            if(!isInGroup){
                currentGroup.push(island);
            }
            return currentGroup;
        }

        function indexObjectInArray(obj, arr) {
            var indexObjectInArray = arr.map(function(element, index) {
                if(element && (element.y === obj.y) && (element.x === obj.x)) {
                    return index;
                }
            }).filter(isRealIndex);
            return indexObjectInArray;
        }
        function isRealIndex(index) {
            if(index || index === 0){
                return true;
            }
        }

        function addIslandsToListForCheck(islands, list, currentGroup) {
            for(var j = 0; j < islands.length; j++){
                var isInCurrentGroup = indexObjectInArray(islands[j], currentGroup);
                if(!isInCurrentGroup.length){
                    list.push(islands[j]);
                }
            }
            return list;
        }

        function removeIslandFromListForCheck(island, list) {
            var islandIndex = indexObjectInArray(island, list);
            if (islandIndex.length){
                list.splice(islandIndex, 1);
            }
            return list;
        }


        function isAGroupOfIslands(currentIsland, land, checkForNeighbours, currentGroup) {
            currentGroup = addIslandToGroup(currentIsland, currentGroup);
            var currentIslandLandNeighbours = checkNeighbours(currentIsland, land);
            if(currentIslandLandNeighbours.length){
                checkForNeighbours = addIslandsToListForCheck(currentIslandLandNeighbours, checkForNeighbours, currentGroup);
            }
            checkForNeighbours = removeIslandFromListForCheck(currentIsland, checkForNeighbours);
            if(checkForNeighbours.length){
                isAGroupOfIslands(checkForNeighbours[0], land, checkForNeighbours, currentGroup);
            } else {
                return currentGroup;
            }
        }

                /*Each land has four neighbours that can be land or water: top, bottom, left, right*/
        function checkNeighbours(currentIsland, land) {
            var coordinateY = currentIsland.y;
            var coordinateX = currentIsland.x;

            var currentIslandLandNeighbours = [];

            /*Top neighbour*/
            var topY = coordinateY-1;
            var topX = coordinateX;
            if(checkType(topY, topX, land)){
                currentIslandLandNeighbours.push({
                    'y':topY,
                    'x':topX
                });
            }

            /*Bottom neighbour*/
            var bottomY = coordinateY+1;
            var bottomX = coordinateX;
            if(checkType(bottomY, bottomX, land)){
                currentIslandLandNeighbours.push({
                    'y':bottomY,
                    'x':bottomX
                });
            }

            /*Left neighbour*/
            var leftY = coordinateY;
            var leftX = coordinateX-1;
            if(checkType(leftY, leftX, land)){
                currentIslandLandNeighbours.push({
                    'y':leftY,
                    'x':leftX
                });
            }


            /*Right neighbour*/
            var rightY = coordinateY;
            var rightX = coordinateX+1;
            if(checkType(rightY, rightX, land)){
                currentIslandLandNeighbours.push({
                    'y':rightY,
                    'x':rightX
                });
            }
            return currentIslandLandNeighbours;
        }

        function checkType(y,x, land) {
            var type = false;
            if(y>=0 && x>=0 && map[y]){
                type = map[y][x];
            }
            return type;
        }

        return islandsCounter;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
