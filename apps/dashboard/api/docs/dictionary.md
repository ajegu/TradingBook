# Asset
An asset is a cryptocurrency coin, indexes or stocks (BTC, S&P 500, Tesla, etc...)

````mermaid
 classDiagram
    class Asset
    Asset : +String name    
    Asset : +String symbol    
    Asset : +DateTime createdAt    
    Asset : +DateTime updatedAt    
    Asset : +AssetImage|null image     
      
    class AssetImage
    AssetImage : +String thumb
    AssetImage : +String small
    AssetImage : +String large
    AssetImage : +DateTime createdAt
    AssetImage : +DateTime updatedAt
    Asset *-- AssetImage
    
````


# Asset pair
An asset pair is a composition of a main asset and a secondary asset like BTC/USDT, Tesla/USD 


