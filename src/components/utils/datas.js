import { ethers } from "ethers";
import abi from "./refarm.json";
// import Refarm from "./utils/refarm.json";
import Swal from "sweetalert2";

const contractAddress = "0x997111AFaf3b305caE45aab4c5ca9205790B6881";
const contractABI = abi.abi;

export async function listenToProductList() {
    //smartcontracttan gelicek

    let products1 = [];
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const Refarm = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("transaction happening...");
            const fields = await Refarm.getAllFields();

            const hexToDecimal = (hex) => parseInt(hex, 16);
            for (let i in fields) {
                products1.push({
                    id: hexToDecimal(fields[i][0]["_hex"]),
                    title: fields[i][1],
                    description: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet",
                    limit: hexToDecimal(fields[i][4]["_hex"]),
                    quantity: hexToDecimal(fields[i][3]["_hex"]),
                    thumbnail_url: "https://cdn1.ntv.com.tr/gorsel/GmgQlcwngEW4nWI_Y6W3lw.jpg?width=952&height=540&mode=both&scale=both",
                });
            }

            products1[0]["description"] =
                "Buğday gerek ülkemizin gerekse tüm Dünya ülkeleri için temel besin kaynağı olan stratejik bir üründür. Konya’da toplam 2.6milyon hektar tarım arazisi mevcut olup bunun yaklaşık 700.000 hektarlık kısmında buğday yetiştiriciliği yapılmaktadır. Bu bölge Türkiye buğday üretiminin yaklaşık %10’unu, sertifikalı buğday tohumluğu üretiminin ise %20’sini karşılamaktır.";
            products1[1]["description"] =
                "Yüzyıllardır fındık tarımı yapılan bu bölgede ihracat da çok eskilere dayanmaktadır. Bölgenin iklim koşulları fındık yetiştiriciliğine uygun olduğu için çok eskilerden itibaren bu bölgelerde fındık tarımı yapılmaktadır. Yazılı belgelere göre ilk fındık ihracatı 1403 yılında yapılmıştır. Bu bölgede fındık tarımı ve ihracatı bir kültür olmuştur.";
            products1[2]["description"] =
                "Türk ve Dünya standartlarına uygun gülyağı ve gül konkreti üretimini gerçekleştiren, dünyanın  bu alanda en büyük üretici ve ihracatçı bölgesi olarak gül tarımı Isparta'da her zaman ön planda olmuştur. Bölgedeki gül ürünleri fabrikaları ile ürünün alıcısı hazır konumdadır.";
            products1[3]["description"] =
                "Doğu Karadeniz Bölgesinin doğusunda ve deniz kıyısında yer alan Rize'nin en temel özelliği, yaş çay üretiminin merkezi olmasıdır. İlin ekonomisine ve ticaretine, makinesiz yapılan çay tarımı damgasını vurur.  Rize'de, yaş çay tarımı 49.960 hektarlık alanda yapılmakta olup, yılda ortalama 1.152.647 ton yaş çay mahsulü alımına karşılık yıllık yaklaşık olarak 290.529 ton kuru çay üretimi gerçekleşmektedir.";
            products1[0]["thumbnail_url"] =
                "https://static.birgun.net/resim/haber-detay-resim/2022/07/06/son-bir-ayda-4-bin-120-donum-ekili-ve-hasat-bekleyen-bugday-tarlasi-yandi-1037629-5.jpg";
            products1[1]["thumbnail_url"] =
                "http://bizimanadolu.com.tr/images/haberler/duzce-akcakoca-da-satilik-findik-bahcesi.jpg";
            products1[2]["thumbnail_url"] =
                "https://www.denizligazetesi.com/images/upload/AW037930_03.jpg";
            products1[3]["thumbnail_url"] =
                "https://icdn.ensonhaber.com/resimler/galeri/3e965c628c3c118d7e6a0aa4b4643c50.jpg";

            console.log("Success");
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Yetersiz Bakiye",
        });
    }

    return products1;
}

export async function lockMoney(id, credit) {
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const Refarm = new ethers.Contract(contractAddress, contractABI, signer);

            const refarmtxn = await Refarm.lockMoney(id, credit);
            console.log(refarmtxn);
            await refarmtxn.wa;

            Swal.fire({
                icon: "success",
                title: "Success",
                text: refarmtxn,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cüzdanınızda yeterli usdc bulunmamaktadır.",
        });
    }
}

export const productDict = {
    1: {
        acr: 50,
        location: "37.593320, 32.474664",
        point: 7,
        product: "Buğday",
        cost: "11.000",
        income: "22.000",
    },
    2: {
        acr: 100,
        location: "40.933578, 37.981061",
        point: 7,
        product: "Fındık",
        cost: "13.000",
        income: "30.000",
    },
    3: {
        acr: 30,
        location: "37.966077, 30.302944",
        point: 9,
        product: "Gül",
        cost: "26.400",
        income: "55.000",
    },
    4: {
        acr: 25,
        location: " 41.022440, 40.485734",
        point: 7,
        product: "Çay",
        cost: "14.000",
        income: "20.000",
    },
};