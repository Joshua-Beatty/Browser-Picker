@echo off

IF "%1" == "uninstall" (
    IF "%2" == "" (
        echo Usage: uninstall ^<name^>
    )
    IF NOT "%2" == "" (
        reg delete "HKCU\SOFTWARE\RegisteredApplications" /v "%2" /f
        reg delete "HKCU\SOFTWARE\Clients\StartMenuInternet\%2"  /f
        reg delete "HKCU\SOFTWARE\Classes\%2HTM" /f
    )
)

IF "%1" == "install" (
    IF "%2" == "" (
        echo Usage: install ^<name^> ^<command?^> ^<icon?^>
    )
    IF NOT "%2" == "" (
        reg add "HKCU\SOFTWARE\RegisteredApplications" /v "%2" /t REG_SZ /d "Software\Clients\StartMenuInternet\%2\Capabilities" /f


        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2" /t REG_SZ /d "%2" /f

        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities" /v "ApplicationDescription" /t REG_SZ /d "%2" /f
        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities" /v "ApplicationIcon" /t REG_SZ /d "%4" /f
        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities" /v "ApplicationName" /t REG_SZ /d "%2" /f

        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities\FileAssociations" /v ".htm" /t REG_SZ /d "%2HTM" /f
        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities\FileAssociations" /v ".html" /t REG_SZ /d "%2HTM" /f

        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities\Startmenu" /v "StartMenuInternet" /t REG_SZ /d "%2" /f

        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities\URLAssociations" /v "http" /t REG_SZ /d "%2HTM" /f
        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\Capabilities\URLAssociations" /v "https" /t REG_SZ /d "%2HTM" /f

        reg add "HKCU\SOFTWARE\Clients\StartMenuInternet\%2\shell\open\command" /t REG_SZ /d "%2HTM" /f


        reg add "HKCU\SOFTWARE\Classes\%2HTM" /t REG_SZ /d "%2 Handler" /f
        reg add "HKCU\SOFTWARE\Classes\%2HTM" /v "AppUserModelId" /t REG_SZ /d "%2" /f

        reg add "HKCU\SOFTWARE\Classes\%2HTM\Application" /v "AppUserModelId" /t REG_SZ /d "%2" /f
        reg add "HKCU\SOFTWARE\Classes\%2HTM\Application" /v "ApplicationIcon" /t REG_SZ /d "%4" /f
        reg add "HKCU\SOFTWARE\Classes\%2HTM\Application" /v "ApplicationName" /t REG_SZ /d "%2" /f
        reg add "HKCU\SOFTWARE\Classes\%2HTM\Application" /v "ApplicationDescription" /t REG_SZ /d "" /f
        reg add "HKCU\SOFTWARE\Classes\%2HTM\Application" /v "ApplicationCompany" /t REG_SZ /d "%2" /f

        reg add "HKCU\SOFTWARE\Classes\%2HTM\DefaultIcon" /t REG_SZ /d "%4" /f
        reg add "HKCU\SOFTWARE\Classes\%2HTM\shell\open\command" /t REG_SZ /d "%~3" /f
    )
)
