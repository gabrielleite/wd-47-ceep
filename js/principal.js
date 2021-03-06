//criando o contador
var contador = $(".cartao").length;

document.querySelector("#mudaLayout").addEventListener("click", function() {
    var mural = document.querySelector(".mural");
    mural.classList.toggle("mural--linhas");

    if (mural.classList.contains("mural--linhas")) {
        this.textContent = "Blocos";
    } else {
        this.textContent = "Linhas";
    }
});

$("#busca").on("input", function() {
    console.log("input");
    var termoBuscado = $(this).val().trim();
    $(".cartao").hide().filter(function() {
        var divConteudoCartao = $(this).find(".cartao-conteudo");
        var textoCartao = divConteudoCartao.text();
        // var padrao = new RegExp(termoBuscado, "i");
        // var padraoEncontrado = padrao.test(textoCartao);

        // if (padraoEncontrado) {
        //     var elementoDestado = "<span class='span-destaque'>$1</span>";
        //     textoCartao = textoCartao
        //                     .replace(new RegExp("("+termoBuscado+")", "gi"),
        //                                 elementoDestado);
            
        // }

        // divConteudoCartao.html(textoCartao);
        var inicio1 = new Date().getMilliseconds();
        var retorno = accent_folded_hilite(textoCartao, termoBuscado);
        var fim1 = new Date().getMilliseconds();
        console.log(fim1-inicio1);

        var inicio2 = new Date().getMilliseconds();
        var retorno2 = highlight(textoCartao, termoBuscado);
        var fim2 = new Date().getMilliseconds();
        console.log(fim2-inicio2);
        divConteudoCartao.html(retorno2.texto);

        return retorno2.padraoEncontrado;
    }).show();
});

$(".novoCartao-conteudo").blur(function(event) {
    var botaoSalvar = $("input.novoCartao-salvar");
    if (event.relatedTarget == botaoSalvar[0]) {
        $(".novoCartao").submit();
    }
});

$(".novoCartao").submit(function(event){
    console.log("submit");
    //impede que a página recarregue
    event.preventDefault();
    
    //pega o que o usuário digitou
    var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val().trim();

    //cria os elementos do cartão e adiciona no DOM
    if (conteudo){
        contador++;

        //cria o botão de remover
        var botaoRemove = $("<button>")
                            .addClass("opcoesDoCartao-remove opcoesDoCartao-opcao")
                            .attr("data-ref", "cartao_" + contador)
                            .text("Remover")
                            .click(removeCartao);

        //cria a div de opcoes
        var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);
        var conteudoTag = $("<p>").addClass("cartao-conteudo")
                                    .append(conteudo);
        $("<div>").attr("id","cartao_" + contador)
                    .addClass("cartao")
                    .append(opcoes)
                    .append(conteudoTag)
                    .prependTo(".mural");
    }
    //apaga o conteúdo do textarea
    campoConteudo.val("");
});

// REMOVER CARTAO NORMAL
function removeCartao() {
    var cartao = document.querySelector("#"+this.dataset.ref);
    cartao.classList.add("cartao--some");
    setTimeout(function() {
        cartao.remove();
    }, 400);
}

// REMOVER CARTAO CLOSURE
// function removeCartaoClosure(x) {
//     // console.log('1 - ' + x);
//     return function() {
//         // console.log('2 - ' + x);
//         var cartao = document.querySelector("#"+this.dataset.ref);
//         cartao.classList.add("cartao--some");
//         // DESAFIO: Exercicio 5.4
//         // var botao = $(this);
//         // var cartao = botao.closest("div.cartao");
//         // cartao.addClass("cartao--some");
//         setTimeout(function() {
//             cartao.remove();
//         }, 400);
//     };
// }
var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
for (var i=0; i<botoes.length; i++) {
    botoes[i].addEventListener("click", removeCartao);
}

// REMOVER CARTAO IIFE - Self Executing Funtion
// var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
// for (var i=0; i<botoes.length; i++) {
//     botoes[i].addEventListener("click", (function(x) {
//         console.log('1 - ' + x);
//         return function() {
//             console.log('2 - ' + x);
//             var cartao = document.querySelector("#"+this.dataset.ref);
//             cartao.classList.add("cartao--some");
//             setTimeout(function() {
//                 cartao.remove();
//             }, 400);
//         };
//     })(i));
// }

/*
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
// var defaultDiacriticsRemovalMap = [
//     {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
//     {'base':'AA','letters':'\uA732'},
//     {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
//     {'base':'AO','letters':'\uA734'},
//     {'base':'AU','letters':'\uA736'},
//     {'base':'AV','letters':'\uA738\uA73A'},
//     {'base':'AY','letters':'\uA73C'},
//     {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
//     {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
//     {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'},
//     {'base':'DZ','letters':'\u01F1\u01C4'},
//     {'base':'Dz','letters':'\u01F2\u01C5'},
//     {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
//     {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
//     {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
//     {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
//     {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
//     {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
//     {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
//     {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
//     {'base':'LJ','letters':'\u01C7'},
//     {'base':'Lj','letters':'\u01C8'},
//     {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
//     {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
//     {'base':'NJ','letters':'\u01CA'},
//     {'base':'Nj','letters':'\u01CB'},
//     {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
//     {'base':'OI','letters':'\u01A2'},
//     {'base':'OO','letters':'\uA74E'},
//     {'base':'OU','letters':'\u0222'},
//     {'base':'OE','letters':'\u008C\u0152'},
//     {'base':'oe','letters':'\u009C\u0153'},
//     {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
//     {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
//     {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
//     {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
//     {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
//     {'base':'TZ','letters':'\uA728'},
//     {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
//     {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
//     {'base':'VY','letters':'\uA760'},
//     {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
//     {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
//     {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
//     {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
//     {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
//     {'base':'aa','letters':'\uA733'},
//     {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
//     {'base':'ao','letters':'\uA735'},
//     {'base':'au','letters':'\uA737'},
//     {'base':'av','letters':'\uA739\uA73B'},
//     {'base':'ay','letters':'\uA73D'},
//     {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
//     {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
//     {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
//     {'base':'dz','letters':'\u01F3\u01C6'},
//     {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
//     {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
//     {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
//     {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
//     {'base':'hv','letters':'\u0195'},
//     {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
//     {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
//     {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
//     {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
//     {'base':'lj','letters':'\u01C9'},
//     {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
//     {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
//     {'base':'nj','letters':'\u01CC'},
//     {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
//     {'base':'oi','letters':'\u01A3'},
//     {'base':'ou','letters':'\u0223'},
//     {'base':'oo','letters':'\uA74F'},
//     {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
//     {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
//     {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
//     {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
//     {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
//     {'base':'tz','letters':'\uA729'},
//     {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
//     {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
//     {'base':'vy','letters':'\uA761'},
//     {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
//     {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
//     {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
//     {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
// ];
// var diacriticsMap = {};
// for (var i=0; i < defaultDiacriticsRemovalMap .length; i++){
//     var letters = defaultDiacriticsRemovalMap [i].letters;
//     for (var j=0; j < letters.length ; j++){
//         diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap [i].base;
//     }
// }

// // "what?" version ... http://jsperf.com/diacritics/12
// function removeDiacritics (str) {
//     return str.replace(/[^\u0000-\u007E]/g, function(a){ 
//        return diacriticsMap[a] || a; 
//     });
// }

var defaultDiacriticsMap = [];
defaultDiacriticsMap['a'] = '[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]';
defaultDiacriticsMap['c'] = '[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]';
defaultDiacriticsMap['e'] = '[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]';
defaultDiacriticsMap['i'] = '[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]';
defaultDiacriticsMap['o'] = '[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]';
defaultDiacriticsMap['u'] =  '[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]';

// "what?" version ... http://jsperf.com/diacritics/12
function removeDiacritics (str) {
    return str.replace(/./g, function(a){
        if (defaultDiacriticsMap[a]) {
            var pattern = defaultDiacriticsMap[a];
            return a.replace(a, pattern);
        }
        for (var i=0; i < defaultDiacriticsMap.length; i++){
            var pattern = defaultDiacriticsMap[i];
            var regExp = new RegExp(pattern);
            if (a.match(regExp)) {
                return a.replace(a, pattern);
            }
        }
       return a;
    });
}

function highlight(texto, busca) {
    busca = removeDiacritics(busca);
    var regExp = new RegExp("("+busca+")", "gi");
    var highlighted = texto.replace(regExp, "<span class='span-destaque'>$1</span>");
    return {texto: highlighted, padraoEncontrado: texto.match(regExp)};
}

//accent-folding function
var accent_map = {
    'ẚ':'a',
    'Á':'a',
    'á':'a',
    'À':'a',
    'à':'a',
    'Ă':'a',
    'ă':'a',
    'Ắ':'a',
    'ắ':'a',
    'Ằ':'a',
    'ằ':'a',
    'Ẵ':'a',
    'ẵ':'a',
    'Ẳ':'a',
    'ẳ':'a',
    'Â':'a',
    'â':'a',
    'Ấ':'a',
    'ấ':'a',
    'Ầ':'a',
    'ầ':'a',
    'Ẫ':'a',
    'ẫ':'a',
    'Ẩ':'a',
    'ẩ':'a',
    'Ǎ':'a',
    'ǎ':'a',
    'Å':'a',
    'å':'a',
    'Ǻ':'a',
    'ǻ':'a',
    'Ä':'a',
    'ä':'a',
    'Ǟ':'a',
    'ǟ':'a',
    'Ã':'a',
    'ã':'a',
    'Ȧ':'a',
    'ȧ':'a',
    'Ǡ':'a',
    'ǡ':'a',
    'Ą':'a',
    'ą':'a',
    'Ā':'a',
    'ā':'a',
    'Ả':'a',
    'ả':'a',
    'Ȁ':'a',
    'ȁ':'a',
    'Ȃ':'a',
    'ȃ':'a',
    'Ạ':'a',
    'ạ':'a',
    'Ặ':'a',
    'ặ':'a',
    'Ậ':'a',
    'ậ':'a',
    'Ḁ':'a',
    'ḁ':'a',
    'Ⱥ':'a',
    'ⱥ':'a',
    'Ǽ':'a',
    'ǽ':'a',
    'Ǣ':'a',
    'ǣ':'a',
    'Ḃ':'b',
    'ḃ':'b',
    'Ḅ':'b',
    'ḅ':'b',
    'Ḇ':'b',
    'ḇ':'b',
    'Ƀ':'b',
    'ƀ':'b',
    'ᵬ':'b',
    'Ɓ':'b',
    'ɓ':'b',
    'Ƃ':'b',
    'ƃ':'b',
    'Ć':'c',
    'ć':'c',
    'Ĉ':'c',
    'ĉ':'c',
    'Č':'c',
    'č':'c',
    'Ċ':'c',
    'ċ':'c',
    'Ç':'c',
    'ç':'c',
    'Ḉ':'c',
    'ḉ':'c',
    'Ȼ':'c',
    'ȼ':'c',
    'Ƈ':'c',
    'ƈ':'c',
    'ɕ':'c',
    'Ď':'d',
    'ď':'d',
    'Ḋ':'d',
    'ḋ':'d',
    'Ḑ':'d',
    'ḑ':'d',
    'Ḍ':'d',
    'ḍ':'d',
    'Ḓ':'d',
    'ḓ':'d',
    'Ḏ':'d',
    'ḏ':'d',
    'Đ':'d',
    'đ':'d',
    'ᵭ':'d',
    'Ɖ':'d',
    'ɖ':'d',
    'Ɗ':'d',
    'ɗ':'d',
    'Ƌ':'d',
    'ƌ':'d',
    'ȡ':'d',
    'ð':'d',
    'É':'e',
    'Ə':'e',
    'Ǝ':'e',
    'ǝ':'e',
    'é':'e',
    'È':'e',
    'è':'e',
    'Ĕ':'e',
    'ĕ':'e',
    'Ê':'e',
    'ê':'e',
    'Ế':'e',
    'ế':'e',
    'Ề':'e',
    'ề':'e',
    'Ễ':'e',
    'ễ':'e',
    'Ể':'e',
    'ể':'e',
    'Ě':'e',
    'ě':'e',
    'Ë':'e',
    'ë':'e',
    'Ẽ':'e',
    'ẽ':'e',
    'Ė':'e',
    'ė':'e',
    'Ȩ':'e',
    'ȩ':'e',
    'Ḝ':'e',
    'ḝ':'e',
    'Ę':'e',
    'ę':'e',
    'Ē':'e',
    'ē':'e',
    'Ḗ':'e',
    'ḗ':'e',
    'Ḕ':'e',
    'ḕ':'e',
    'Ẻ':'e',
    'ẻ':'e',
    'Ȅ':'e',
    'ȅ':'e',
    'Ȇ':'e',
    'ȇ':'e',
    'Ẹ':'e',
    'ẹ':'e',
    'Ệ':'e',
    'ệ':'e',
    'Ḙ':'e',
    'ḙ':'e',
    'Ḛ':'e',
    'ḛ':'e',
    'Ɇ':'e',
    'ɇ':'e',
    'ɚ':'e',
    'ɝ':'e',
    'Ḟ':'f',
    'ḟ':'f',
    'ᵮ':'f',
    'Ƒ':'f',
    'ƒ':'f',
    'Ǵ':'g',
    'ǵ':'g',
    'Ğ':'g',
    'ğ':'g',
    'Ĝ':'g',
    'ĝ':'g',
    'Ǧ':'g',
    'ǧ':'g',
    'Ġ':'g',
    'ġ':'g',
    'Ģ':'g',
    'ģ':'g',
    'Ḡ':'g',
    'ḡ':'g',
    'Ǥ':'g',
    'ǥ':'g',
    'Ɠ':'g',
    'ɠ':'g',
    'Ĥ':'h',
    'ĥ':'h',
    'Ȟ':'h',
    'ȟ':'h',
    'Ḧ':'h',
    'ḧ':'h',
    'Ḣ':'h',
    'ḣ':'h',
    'Ḩ':'h',
    'ḩ':'h',
    'Ḥ':'h',
    'ḥ':'h',
    'Ḫ':'h',
    'ḫ':'h',
    'H':'h',
    '̱':'h',
    'ẖ':'h',
    'Ħ':'h',
    'ħ':'h',
    'Ⱨ':'h',
    'ⱨ':'h',
    'Í':'i',
    'í':'i',
    'Ì':'i',
    'ì':'i',
    'Ĭ':'i',
    'ĭ':'i',
    'Î':'i',
    'î':'i',
    'Ǐ':'i',
    'ǐ':'i',
    'Ï':'i',
    'ï':'i',
    'Ḯ':'i',
    'ḯ':'i',
    'Ĩ':'i',
    'ĩ':'i',
    'İ':'i',
    'i':'i',
    'Į':'i',
    'į':'i',
    'Ī':'i',
    'ī':'i',
    'Ỉ':'i',
    'ỉ':'i',
    'Ȉ':'i',
    'ȉ':'i',
    'Ȋ':'i',
    'ȋ':'i',
    'Ị':'i',
    'ị':'i',
    'Ḭ':'i',
    'ḭ':'i',
    'I':'i',
    'ı':'i',
    'Ɨ':'i',
    'ɨ':'i',
    'Ĵ':'j',
    'ĵ':'j',
    'J':'j',
    '̌':'j',
    'ǰ':'j',
    'ȷ':'j',
    'Ɉ':'j',
    'ɉ':'j',
    'ʝ':'j',
    'ɟ':'j',
    'ʄ':'j',
    'Ḱ':'k',
    'ḱ':'k',
    'Ǩ':'k',
    'ǩ':'k',
    'Ķ':'k',
    'ķ':'k',
    'Ḳ':'k',
    'ḳ':'k',
    'Ḵ':'k',
    'ḵ':'k',
    'Ƙ':'k',
    'ƙ':'k',
    'Ⱪ':'k',
    'ⱪ':'k',
    'Ĺ':'a',
    'ĺ':'l',
    'Ľ':'l',
    'ľ':'l',
    'Ļ':'l',
    'ļ':'l',
    'Ḷ':'l',
    'ḷ':'l',
    'Ḹ':'l',
    'ḹ':'l',
    'Ḽ':'l',
    'ḽ':'l',
    'Ḻ':'l',
    'ḻ':'l',
    'Ł':'l',
    'ł':'l',
    'Ł':'l',
    '̣':'l',
    'ł':'l',
    '̣':'l',
    'Ŀ':'l',
    'ŀ':'l',
    'Ƚ':'l',
    'ƚ':'l',
    'Ⱡ':'l',
    'ⱡ':'l',
    'Ɫ':'l',
    'ɫ':'l',
    'ɬ':'l',
    'ɭ':'l',
    'ȴ':'l',
    'Ḿ':'m',
    'ḿ':'m',
    'Ṁ':'m',
    'ṁ':'m',
    'Ṃ':'m',
    'ṃ':'m',
    'ɱ':'m',
    'Ń':'n',
    'ń':'n',
    'Ǹ':'n',
    'ǹ':'n',
    'Ň':'n',
    'ň':'n',
    'Ñ':'n',
    'ñ':'n',
    'Ṅ':'n',
    'ṅ':'n',
    'Ņ':'n',
    'ņ':'n',
    'Ṇ':'n',
    'ṇ':'n',
    'Ṋ':'n',
    'ṋ':'n',
    'Ṉ':'n',
    'ṉ':'n',
    'Ɲ':'n',
    'ɲ':'n',
    'Ƞ':'n',
    'ƞ':'n',
    'ɳ':'n',
    'ȵ':'n',
    'N':'n',
    '̈':'n',
    'n':'n',
    '̈':'n',
    'Ó':'o',
    'ó':'o',
    'Ò':'o',
    'ò':'o',
    'Ŏ':'o',
    'ŏ':'o',
    'Ô':'o',
    'ô':'o',
    'Ố':'o',
    'ố':'o',
    'Ồ':'o',
    'ồ':'o',
    'Ỗ':'o',
    'ỗ':'o',
    'Ổ':'o',
    'ổ':'o',
    'Ǒ':'o',
    'ǒ':'o',
    'Ö':'o',
    'ö':'o',
    'Ȫ':'o',
    'ȫ':'o',
    'Ő':'o',
    'ő':'o',
    'Õ':'o',
    'õ':'o',
    'Ṍ':'o',
    'ṍ':'o',
    'Ṏ':'o',
    'ṏ':'o',
    'Ȭ':'o',
    'ȭ':'o',
    'Ȯ':'o',
    'ȯ':'o',
    'Ȱ':'o',
    'ȱ':'o',
    'Ø':'o',
    'ø':'o',
    'Ǿ':'o',
    'ǿ':'o',
    'Ǫ':'o',
    'ǫ':'o',
    'Ǭ':'o',
    'ǭ':'o',
    'Ō':'o',
    'ō':'o',
    'Ṓ':'o',
    'ṓ':'o',
    'Ṑ':'o',
    'ṑ':'o',
    'Ỏ':'o',
    'ỏ':'o',
    'Ȍ':'o',
    'ȍ':'o',
    'Ȏ':'o',
    'ȏ':'o',
    'Ơ':'o',
    'ơ':'o',
    'Ớ':'o',
    'ớ':'o',
    'Ờ':'o',
    'ờ':'o',
    'Ỡ':'o',
    'ỡ':'o',
    'Ở':'o',
    'ở':'o',
    'Ợ':'o',
    'ợ':'o',
    'Ọ':'o',
    'ọ':'o',
    'Ộ':'o',
    'ộ':'o',
    'Ɵ':'o',
    'ɵ':'o',
    'Ṕ':'p',
    'ṕ':'p',
    'Ṗ':'p',
    'ṗ':'p',
    'Ᵽ':'p',
    'Ƥ':'p',
    'ƥ':'p',
    'P':'p',
    '̃':'p',
    'p':'p',
    '̃':'p',
    'ʠ':'q',
    'Ɋ':'q',
    'ɋ':'q',
    'Ŕ':'r',
    'ŕ':'r',
    'Ř':'r',
    'ř':'r',
    'Ṙ':'r',
    'ṙ':'r',
    'Ŗ':'r',
    'ŗ':'r',
    'Ȑ':'r',
    'ȑ':'r',
    'Ȓ':'r',
    'ȓ':'r',
    'Ṛ':'r',
    'ṛ':'r',
    'Ṝ':'r',
    'ṝ':'r',
    'Ṟ':'r',
    'ṟ':'r',
    'Ɍ':'r',
    'ɍ':'r',
    'ᵲ':'r',
    'ɼ':'r',
    'Ɽ':'r',
    'ɽ':'r',
    'ɾ':'r',
    'ᵳ':'r',
    'ß':'s',
    'Ś':'s',
    'ś':'s',
    'Ṥ':'s',
    'ṥ':'s',
    'Ŝ':'s',
    'ŝ':'s',
    'Š':'s',
    'š':'s',
    'Ṧ':'s',
    'ṧ':'s',
    'Ṡ':'s',
    'ṡ':'s',
    'ẛ':'s',
    'Ş':'s',
    'ş':'s',
    'Ṣ':'s',
    'ṣ':'s',
    'Ṩ':'s',
    'ṩ':'s',
    'Ș':'s',
    'ș':'s',
    'ʂ':'s',
    'S':'s',
    '̩':'s',
    's':'s',
    '̩':'s',
    'Þ':'t',
    'þ':'t',
    'Ť':'t',
    'ť':'t',
    'T':'t',
    '̈':'t',
    'ẗ':'t',
    'Ṫ':'t',
    'ṫ':'t',
    'Ţ':'t',
    'ţ':'t',
    'Ṭ':'t',
    'ṭ':'t',
    'Ț':'t',
    'ț':'t',
    'Ṱ':'t',
    'ṱ':'t',
    'Ṯ':'t',
    'ṯ':'t',
    'Ŧ':'t',
    'ŧ':'t',
    'Ⱦ':'t',
    'ⱦ':'t',
    'ᵵ':'t',
    'ƫ':'t',
    'Ƭ':'t',
    'ƭ':'t',
    'Ʈ':'t',
    'ʈ':'t',
    'ȶ':'t',
    'Ú':'u',
    'ú':'u',
    'Ù':'u',
    'ù':'u',
    'Ŭ':'u',
    'ŭ':'u',
    'Û':'u',
    'û':'u',
    'Ǔ':'u',
    'ǔ':'u',
    'Ů':'u',
    'ů':'u',
    'Ü':'u',
    'ü':'u',
    'Ǘ':'u',
    'ǘ':'u',
    'Ǜ':'u',
    'ǜ':'u',
    'Ǚ':'u',
    'ǚ':'u',
    'Ǖ':'u',
    'ǖ':'u',
    'Ű':'u',
    'ű':'u',
    'Ũ':'u',
    'ũ':'u',
    'Ṹ':'u',
    'ṹ':'u',
    'Ų':'u',
    'ų':'u',
    'Ū':'u',
    'ū':'u',
    'Ṻ':'u',
    'ṻ':'u',
    'Ủ':'u',
    'ủ':'u',
    'Ȕ':'u',
    'ȕ':'u',
    'Ȗ':'u',
    'ȗ':'u',
    'Ư':'u',
    'ư':'u',
    'Ứ':'u',
    'ứ':'u',
    'Ừ':'u',
    'ừ':'u',
    'Ữ':'u',
    'ữ':'u',
    'Ử':'u',
    'ử':'u',
    'Ự':'u',
    'ự':'u',
    'Ụ':'u',
    'ụ':'u',
    'Ṳ':'u',
    'ṳ':'u',
    'Ṷ':'u',
    'ṷ':'u',
    'Ṵ':'u',
    'ṵ':'u',
    'Ʉ':'u',
    'ʉ':'u',
    'Ṽ':'v',
    'ṽ':'v',
    'Ṿ':'v',
    'ṿ':'v',
    'Ʋ':'v',
    'ʋ':'v',
    'Ẃ':'w',
    'ẃ':'w',
    'Ẁ':'w',
    'ẁ':'w',
    'Ŵ':'w',
    'ŵ':'w',
    'W':'w',
    '̊':'w',
    'ẘ':'w',
    'Ẅ':'w',
    'ẅ':'w',
    'Ẇ':'w',
    'ẇ':'w',
    'Ẉ':'w',
    'ẉ':'w',
    'Ẍ':'x',
    'ẍ':'x',
    'Ẋ':'x',
    'ẋ':'x',
    'Ý':'y',
    'ý':'y',
    'Ỳ':'y',
    'ỳ':'y',
    'Ŷ':'y',
    'ŷ':'y',
    'Y':'y',
    '̊':'y',
    'ẙ':'y',
    'Ÿ':'y',
    'ÿ':'y',
    'Ỹ':'y',
    'ỹ':'y',
    'Ẏ':'y',
    'ẏ':'y',
    'Ȳ':'y',
    'ȳ':'y',
    'Ỷ':'y',
    'ỷ':'y',
    'Ỵ':'y',
    'ỵ':'y',
    'ʏ':'y',
    'Ɏ':'y',
    'ɏ':'y',
    'Ƴ':'y',
    'ƴ':'y',
    'Ź':'z',
    'ź':'z',
    'Ẑ':'z',
    'ẑ':'z',
    'Ž':'z',
    'ž':'z',
    'Ż':'z',
    'ż':'z',
    'Ẓ':'z',
    'ẓ':'z',
    'Ẕ':'z',
    'ẕ':'z',
    'Ƶ':'z',
    'ƶ':'z',
    'Ȥ':'z',
    'ȥ':'z',
    'ʐ':'z',
    'ʑ':'z',
    'Ⱬ':'z',
    'ⱬ':'z',
    'Ǯ':'z',
    'ǯ':'z',
    'ƺ':'z',
    
    // Roman fullwidth ascii equivalents: 0xff00 to 0xff5e
    '２':'2',
    '６':'6',
    'Ｂ':'B',
    'Ｆ':'F',
    'Ｊ':'J',
    'Ｎ':'N',
    'Ｒ':'R',
    'Ｖ':'V',
    'Ｚ':'Z',
    'ｂ':'b',
    'ｆ':'f',
    'ｊ':'j',
    'ｎ':'n',
    'ｒ':'r',
    'ｖ':'v',
    'ｚ':'z',
    '１':'1',
    '５':'5',
    '９':'9',
    'Ａ':'A',
    'Ｅ':'E',
    'Ｉ':'I',
    'Ｍ':'M',
    'Ｑ':'Q',
    'Ｕ':'U',
    'Ｙ':'Y',
    'ａ':'a',
    'ｅ':'e',
    'ｉ':'i',
    'ｍ':'m',
    'ｑ':'q',
    'ｕ':'u',
    'ｙ':'y',
    '０':'0',
    '４':'4',
    '８':'8',
    'Ｄ':'D',
    'Ｈ':'H',
    'Ｌ':'L',
    'Ｐ':'P',
    'Ｔ':'T',
    'Ｘ':'X',
    'ｄ':'d',
    'ｈ':'h',
    'ｌ':'l',
    'ｐ':'p',
    'ｔ':'t',
    'ｘ':'x',
    '３':'3',
    '７':'7',
    'Ｃ':'C',
    'Ｇ':'G',
    'Ｋ':'K',
    'Ｏ':'O',
    'Ｓ':'S',
    'Ｗ':'W',
    'ｃ':'c',
    'ｇ':'g',
    'ｋ':'k',
    'ｏ':'o',
    'ｓ':'s',
    'ｗ':'w'};
    
    var accentMap = {
        'á':'a', 'é':'e', 'í':'i','ó':'o','ú':'u'
    };
    
    function accent_fold (s) {
        if (!s) { return ''; }
        var ret = '';
        for (var i=0; i<s.length; i++) {
            ret += accent_map[s.charAt(i)] || s.charAt(i);
        }
        return ret;
    };
    
    
    // accent_folded_hilite("Fulanilo López", 'lo')
    //   --> "Fulani<b>lo</b> <b>Ló</b>pez"
    //
    function accent_folded_hilite(str, q) {
      var str_folded = accent_fold(str).toLowerCase().replace(/[<>]+/g, '');
      var q_folded = accent_fold(q).toLowerCase().replace(/[<>]+/g, '');
    
      // create an intermediary string with hilite hints
      // example: fulani<lo> <lo>pez
      var re = new RegExp(q_folded, 'g');
      var hilite_hints = str_folded.replace(re, '<'+q_folded+'>');
    
      // index pointer for the original string
      var spos = 0;
      // accumulator for our final string
      var highlighted = '';
    
      // walk down the original string and the hilite hint
      // string in parallel. when you encounter a < or > hint,
      // append the opening / closing tag in our final string.
      // if the current char is not a hint, append the corresponding
      // char from the *original* string to our final string and
      // advance the original string's pointer.
      for (var i=0; i<hilite_hints.length; i++) {
        var c = str.charAt(spos);
        var h = hilite_hints.charAt(i);
        if (h === '<') {
           highlighted += '<span class="span-destaque">';
        } else if (h === '>') {
           highlighted += '</span>';
        } else {
          spos += 1;
          highlighted += c;
        }
      }
      return {texto: highlighted, padraoEncontrado: str_folded.match(re)};
    }