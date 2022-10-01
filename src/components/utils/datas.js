import { ethers } from "ethers";
import abi from "./refarm.json";
// import Refarm from "./utils/refarm.json";
import Swal from "sweetalert2";

const contractAddress = "0x997111AFaf3b305caE45aab4c5ca9205790B6881";
const contractABI = abi.abi;

export async function listenToProductList() {
    //smartcontracttan gelicek

    let products1 = []
    try {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const Refarm = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            console.log("transaction happening...");
            const fields = await Refarm.getAllFields();

            const hexToDecimal = hex => parseInt(hex, 16);
            for (let i in fields) {
                products1.push({ "id": hexToDecimal(fields[i][0]["_hex"]), "title": fields[i][1], "description": "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet", "limit": hexToDecimal(fields[i][4]["_hex"]), "quantity": hexToDecimal(fields[i][3]["_hex"]), "thumbnail_url": "https://cdn1.ntv.com.tr/gorsel/GmgQlcwngEW4nWI_Y6W3lw.jpg?width=952&height=540&mode=both&scale=both" });
            }

            products1[0]["description"] = "Konyada yetişen buğdaylarla alakalı bazı durumlar ve açıkalamakr infolar analizler v vs yazma yeri Konyada yetişen buğdaylarla alakalı bazı durumlar ve açıkalamakr infolar analizler v vs yazma yeri"
            products1[1]["description"] = "Ordunun Dereleri Aksa Yukarı AksaVermem Seni Ellere Ordu Üstüme Kalksa(Sürmelim Aman) Ordunun Dereleri Aksa Yukarı AksaVermem Seni Ellere Ordu Üstüme Kalksa(Sürmelim Aman) "
            products1[2]["description"] = "Isparta ve çevresindeki yerleşim tarihi Paleolitik döneme kadar uzanmaktadır. Isparta'nın da önemli yerleşim merkezlerinden biri olduğu Pisidia bölgesine MÖ 2000’lerde Luvi ve Arzava toplulukları yerleşmiştir. Daha sonra bölgeye MÖ 1200'lerden itibaren Frigler, Lidyalılar, Persler ve Makedonyalılar egemen olmuştur. MÖ 323’te Büyük İskender’in"
            products1[3]["description"] = "Antik Çağ yazılı kaynaklarında Rhizus (Ριζοῦς) olarak anılan Rize adının Yunanca ριζα (riza) isminden geldiği sanılmakta olup anlamıDağ Eteğidir. Bazı yazarlar kent adını yine Yunanca pirinç anlamına gelen rizi (ρύζι) ile kök, temel, esas anlamına gelen Riza (ῥίζα) kelimesiyle ilişkilendirmiş,"
            products1[0]["thumbnail_url"] = "https://static.birgun.net/resim/haber-detay-resim/2022/07/06/son-bir-ayda-4-bin-120-donum-ekili-ve-hasat-bekleyen-bugday-tarlasi-yandi-1037629-5.jpg"
            products1[1]["thumbnail_url"] = "http://bizimanadolu.com.tr/images/haberler/duzce-akcakoca-da-satilik-findik-bahcesi.jpg"
            products1[2]["thumbnail_url"] = "https://www.denizligazetesi.com/images/upload/AW037930_03.jpg"
            products1[3]["thumbnail_url"] = "https://icdn.ensonhaber.com/resimler/galeri/3e965c628c3c118d7e6a0aa4b4643c50.jpg"


        }
    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
        });
    }



    return products1;


}