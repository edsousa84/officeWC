-- ANALOG TEST (PING 

--rui = adc.read(0);
--print(rui);


-- DIGITAL TEST 

-- (1) read from dig pin PULLUP 
--gpio.mode(1, gpio.INPUT, gpio.PULLUP);
--piu = gpio.read(1);

-- (2) read from dig pin 
--gpio.mode(2 , gpio.INPUT );
--proximity = gpio.read(2);
--print("Is someone there");
--print(proximity);

-- (3) set dig pin OUTPUT
gpio.mode(1, gpio.OUTPUT);
gpio.write(1, gpio.HIGH);

-- SAFE MODE SLEEP STOP 
gpio.mode(2, gpio.INPUT, gpio.PULLUP);
safeWord = gpio.read(2);
--if piu == 1 then
--   print("pop1");

--else
--   print("RUI 2");
--end


-- MAIN

wifi.setmode(wifi.STATION)
--print(wifi.sta.getip())

--MAC = wifi.sta.getmac();
MAC = "0c:8b:fd:9b:a3:93";
print(MAC);

wifi.sta.config("FABAMAQ-Guest","password da rede sem fios")
wifi.sta.connect()
tmr.alarm(1, 1000, 1, function()
     if wifi.sta.getip() == nil then
         print("Connecting...")
     else
         tmr.stop(1)
         print("Connected, IP is "..wifi.sta.getip())
--          /device/[type]/[mac]/[interface]/[value]
            http.get("http://172.20.199.194:8080/device/sensor/" .. MAC .. "/1/" , nil, function(code, data)
            
            if (code < 0) then
              print("HTTP request failed")
            elseif (safeWord == 0) then
              print("STOP please");            
            else
--            print(code, data)
              print("RUI is working");
              node.dsleep(5000000)
            end
          end)
     end
end)
