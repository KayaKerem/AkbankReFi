// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
interface USDC {

    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

}
contract Fields {



    struct Field{
        uint256 id;
        string name;
        address owner;
        uint256 containsMoney;
        uint256 limitOfInvest;
    }


    event Invest(
        address indexed from,
        uint256 timestamp,
        Field field,
        uint256 amountOfMoney
    );

    event RunField(
        address indexed from,
        uint256 timestamp,
        Field field,
        uint256 amountOfMoney
    );


    event Bounty(
        address indexed from,
        uint256 timestamp,
        Field field,
        uint256 amountOfMoney
    );

    USDC public USDc;

    Field [] allFields;
    uint256 public fieldId = 5;
    uint256 public defaultMaxMoney = 5000;
    mapping(uint256 => mapping(address => uint256)) balancesOfInvestedMoney;//Tarla id -> (Yatırımcı adresi --> yatırımcının ne kadar yatırdığı)
    mapping(uint256 =>uint256) bounties;//tarla id -> hasılat sontası geri ödenen toplam para
    function setDefaultFarms()public{
        allFields.push(
            Field(
                1,
                "Konya Bugday Tarlasi",
                0xA02D09d454861A0ccd2e8518886cDcEC37ecDd2c,
                0,
                defaultMaxMoney
            )
        );
        allFields.push(
            Field(
                2,
                "Ordu Findik Tarlasi",
                0xA02D09d454861A0ccd2e8518886cDcEC37ecDd2c,
                0,
                defaultMaxMoney
            )
        );
        allFields.push(
            Field(
                3,
                "Isparta Gul Tarlasi",
                0xA02D09d454861A0ccd2e8518886cDcEC37ecDd2c,
                0,
                defaultMaxMoney
            )
        );
        allFields.push(
            Field(
                4,
                "Rize Cay Tarlasi",
                0xA02D09d454861A0ccd2e8518886cDcEC37ecDd2c,
                0,
                defaultMaxMoney
            )
        );
    }
    constructor(){
        USDc = USDC(0x5425890298aed601595a70AB815c96711a31Bc65);//USDC Avalanche  Fuji Testnet ağına ait smart contract adresi
        //0x5425890298aed601595a70AB815c96711a31Bc65 //Tesnet
        setDefaultFarms();
    }               

    function beFarmer(string memory name) public {//Çiftçi olmak için çağırılır
        allFields.push(
            Field(
                fieldId,
                name,
                msg.sender,
                0,
                defaultMaxMoney
            )
        );
        fieldId +=1;
    }

    function getAddressOfInvestedMoney(uint256 Id) public view returns(uint256){//Çağıran kişinin tarla id si verilen tarlaya yaptığı yatırım miktarı
        return balancesOfInvestedMoney[Id][msg.sender];
    }

    function getField(uint256 _id)public view returns(Field memory){
        for(uint256 i = 0; i < allFields.length;i++){
            if(allFields[i].id == _id){
                return allFields[i];
            }
        }
        return Field(
            0,
            "",
            0x0000000000000000000000000000000000000000,
            0,
            0
        );
    }
    function getAllFields()public view returns(Field [] memory){
        return allFields;
    }



    function lockMoney(uint256 Id,uint256 $USDC) public{ //Tarlaya para gönderilir yatırımcı tarafından
            require($USDC <= msg.sender.balance,"You don't have enough money");
            require(($USDC + getField(Id).containsMoney) <= getField(Id).limitOfInvest,"You don't invest that much money");

            balancesOfInvestedMoney[Id][msg.sender] += $USDC;
            getField(Id).containsMoney += $USDC;
            USDc.transferFrom(msg.sender, address(this), $USDC * 10 ** 6);
            emit Invest(
                msg.sender,
                block.timestamp,
                getField(Id),
                $USDC
            );
    } 

    //Tarlada yeterli miktarda para depolanmıştır bu yüzden tarla çalışmaya başlar
    //Paralar çiftçiye gönderilir
    function runField(uint256 Id) public {

        
        USDc.transfer(getField(Id).owner, getField(Id).limitOfInvest);
        emit RunField(
                getField(Id).owner,
                block.timestamp,
                getField(Id),
                defaultMaxMoney
        );
    }


    //Çiftçi hasılatı aldıktan sonra kazandığı paranın belli bir miktarını kontrata geri döner
    //Tüm ödüller kontratta toplanır
    function getBountiesToContract(uint256 Id,uint256 $USDC) public{

        getField(Id).containsMoney = 0;
        bounties[Id] = $USDC;
        USDc.transfer(getField(Id).owner, $USDC);

        emit Bounty(
                getField(Id).owner,
                block.timestamp,
                getField(Id),
                defaultMaxMoney
        );
    }

    //Withdraw tuşuna basan yatırımcılar yatırımları gereği belli oranlarda paraları geri cüzdanına çeker
    function withdrawBounty(uint256 Id) public{
        require(balancesOfInvestedMoney[Id][msg.sender] > 0,"You did not invest any money to this farm");
        USDc.transfer(getField(Id).owner, (bounties[Id] * balancesOfInvestedMoney[Id][msg.sender] ) / defaultMaxMoney);
        balancesOfInvestedMoney[Id][msg.sender] = 0;
    }




}
