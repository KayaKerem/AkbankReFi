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


    USDC public USDc;

    struct Field{
        uint256 id;
        string name;
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




    uint256 public fieldId = 1;
    uint256 public defaultMaxMoney = 500000;
    mapping(uint256 => string) fields;//Tarla id --> tarla ismi
    mapping(uint256 => address) farmers;//tarla id --> çiftçi adresi
    mapping(uint256 => uint256) TotalMoneyOfFields;//Tarla id --> Toplanan para
    mapping(uint256 => mapping(address => uint256)) balancesOfInvestedMoney;//Tarla id -> (Yatırımcı adresi --> yatırımcının ne kadar yatırdığı)

    constructor(){
        USDc = USDC(0x1Ad483798422423E3471d2fa8a7eF6EB83BD4926);//USDC Avalanche ağına ait smart contract adresi
        //0x1Ad483798422423E3471d2fa8a7eF6EB83BD4926 //Tesnet
    }               


    function getFarmer(uint256 Id)public view returns(address){ //Çiftçi adresi döner
        return farmers[Id];
    }
    function getTotalLockedMoney(uint256 Id)public view returns(uint256){//Tarlada şuana kadar toplanan toplam parayı döner 
        return TotalMoneyOfFields[Id];
    }
    function getAddressOfInvestedMoney(uint256 Id) public view returns(uint256){//Çağıran kişinin tarla id si verilen tarlaya yaptığı yatırım miktarı
        return balancesOfInvestedMoney[Id][msg.sender];
    }
    function getFieldName(uint256 Id)public view returns(string memory){//Tarla ismi döner
        return fields[Id];
    }


    function beFarmer(string memory name) public {//Çiftçi olmak için çağırılır
        fields[fieldId] = name;
        farmers[fieldId] = msg.sender;
        fieldId +=1;
    }

    function lockMoney(uint256 Id,uint256 $USDC) public{ //Tarlaya para gönderilir yatırımcı tarafından
            require($USDC <= msg.sender.balance,"You don't have enough money");
            require(($USDC + getTotalLockedMoney(Id)) <= defaultMaxMoney,"You don't invest that much money");

            balancesOfInvestedMoney[Id][msg.sender] += $USDC;
            TotalMoneyOfFields[Id]+= $USDC;
            USDc.transferFrom(msg.sender, address(this), $USDC * 10 ** 6);
            emit Invest(
                msg.sender,
                block.timestamp,
                Field(
                    Id,
                    fields[Id]
                ),
                $USDC
            );
    } 

    //Tarlada yeterli miktarda para depolanmıştır bu yüzden tarla çalışmaya başlar
    //Paralar çiftçiye gönderilir
    function runField(uint256 Id) public {

        
        USDc.transfer(getFarmer(Id), defaultMaxMoney);
        emit RunField(
                getFarmer(Id),
                block.timestamp,
                Field(
                    Id,
                    fields[Id]
                ),
                defaultMaxMoney
        );
    }


    //Çiftçi hasılatı aldıktan sonra kazandığı paranın belli bir miktarını kontrata geri döner
    //Tüm ödüller kontratta toplanır
    function getBountiesToContract(uint256 Id) public{


        USDc.transfer(getFarmer(Id), USDc.balanceOf(address(this)));
        emit Bounty(
                getFarmer(Id),
                block.timestamp,
                Field(
                    Id,
                    fields[Id]
                ),
                defaultMaxMoney
        );
    }

    //Withdraw tuşuna basan yatırımcılar yatırımları gereği belli oranlarda paraları geri cüzdanına çeker
    function withdrawBounty(uint256 Id) public{
        require(balancesOfInvestedMoney[Id][msg.sender] > 0,"You did not invest any money to this farm");
        USDc.transfer(getFarmer(Id), (USDc.balanceOf(address(this)) * balancesOfInvestedMoney[Id][msg.sender] ) / defaultMaxMoney);
        balancesOfInvestedMoney[Id][msg.sender] = 0;
    }




}
