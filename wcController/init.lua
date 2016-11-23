print(wifi.sta.getip())



-- ANALOG TEST (PING 

rui = adc.read(0);
print(rui);


-- DIGITAL TEST (PIN D0) 

gpio.mode(1, gpio.INPUT, gpio.PULLUP)
piu = gpio.read(1)

if piu == 1 then
   print("pop1");

else
   print("RUI 2")
end


-- MAIN

print(wifi.sta.getip())

wifi.setmode(wifi.STATION)

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
            http.get("http://172.20.199.194:8080/device/sensor/" .. MAC .. "/1/" .. rui , nil, function(code, data)
            
            if (code < 0) then
              print("HTTP request failed")
            else
              print(code, data)
              node.dsleep(5000000)
            end
          end)
     end
end)
