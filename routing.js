var graph = new DirectedGraph(); 
var INFINITY = 1 / 0;
var x_path = [];

function route_setup(){
    
    var end_point = parseInt(document.getElementById("end_point").value);
    
    
    connector();
    console.log("conexao feita"); 
    var out = djikstra(graph, '0');
    console.log("djikstra feita");
    for (i = 0; i < data.features.length; i++) {
        for (j = 0; j < out.caminha_curto[end_point].length; j++) {
            if (String(i) == out.caminha_curto[end_point][j]) {
                var x_i = i;
                x_path.push({
                    lat: data.features[x_i].geometry.coordinates[1],
                    lng: data.features[x_i].geometry.coordinates[0]
                });
            }
        }
    }
    x_path.push({
        lat: data.features[end_point].geometry.coordinates[1],
        lng: data.features[end_point].geometry.coordinates[0]
    });

    return x_path;
}

function DirectedGraph() { //cria um objeto grafo
    this.vertices = {};
    this.addVertex = function(name, edges) {
        edges = edges || null;
        this.vertices[name] = edges;
    };
}

function djikstra(graph, vertice_comeco) { //o grafo é um objeto DirectedGraph
    var distancia = {};
    var anterior = {};
    var q = {};
    var caminha_curto = {};

    for (var vertex in graph.vertices) { //inicializa os vetores
        distancia[vertex] = INFINITY;
        anterior[vertex] = null;
        q[vertex] = graph.vertices[vertex];
        caminha_curto[vertex] = [];
    }

    distancia[vertice_comeco] = 0;

    while (Object.keys(q).length !== 0) {
        var menor = findmenor(distancia, q);
        var menorNode = graph.vertices[menor];
        //procura o vértice u no conjunto de vértices Q que tem o menor valor de distancia[menor].

        for (var vizinho in menorNode) {
            var alt = distancia[menor] + menorNode[vizinho];
            //menorNode[vizinho] é a distância entre o menor e o vizinho
            if (alt < distancia[vizinho]) {
                distancia[vizinho] = alt;
                anterior[vizinho] = menor;
            }
        }
    }

    getcaminha_curto(anterior, caminha_curto, vertice_comeco, distancia); //preenche o vetor caminha_curto
    return {
        caminha_curto: caminha_curto,
        shortestDistances: distancia
    };
}

function findmenor(distancia, q) { //retorna o vértice u no conjunto de vértices Q que tem o menor valor de distancia[menor].
    var min = Infinity;
    var minNode;

    for (var node in q) { //procura o vértice u no conjunto de vértices Q que tem o menor valor de distancia[menor].
        if (distancia[node] <= min) {
            min = distancia[node];
            minNode = node;
        }
    }

    delete q[minNode];
    return minNode;
}

function getcaminha_curto(anteriorious, caminha_curto, vertice_comeco, distancia) { //preenche o vetor caminha_curto
    for (var node in caminha_curto) {
        var path = caminha_curto[node];

        while (anteriorious[node]) {
            path.push(node);
            node = anteriorious[node];
        }

        //gets the starting node in there as well if there was a path from it
        if (distancia[node] === 0) {
            path.push(node);
        }
        path.reverse();
    }
}

function weight(a, b) {
    var R = 6371; // Raio da Terra em km
    var dLat = deg2rad(b[1] - a[1]); // deg2rad abaixo
    var dLon = deg2rad(b[0] - a[0]);
    var temp =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(a[1])) * Math.cos(deg2rad(b[1])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(temp), Math.sqrt(1 - temp));
    var d = R * c; // distância em km
    return d;
}

function deg2rad(deg) { //converte graus para radianos
    return deg * (Math.PI / 180);
}
