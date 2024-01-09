import {
    app,
    dialog,
    globalShortcut,
    ipcMain,
    nativeTheme,
    shell,
    systemPreferences,
    type App,
    type Dialog,
    type GlobalShortcut,
    type IpcMain,
    type NativeTheme,
    type Shell,
    type SystemPreferences,
} from "electron";
import mitt, { Emitter } from "mitt";
import { platform } from "os";
import { AboutUeliModule } from "./AboutUeli";
import { ActionHandlerModule } from "./ActionHandler";
import { BrowserWindowModule } from "./BrowserWindow";
import { ClockModule } from "./Clock";
import { CommandlineUtilityModule } from "./CommandlineUtility";
import { DependencyInjectorModule } from "./DependencyInjector";
import { DialogModule } from "./Dialog/DialogModule";
import { EventEmitterModule } from "./EventEmitter";
import { EventSubscriberModule } from "./EventSubscriber";
import { ExtensionCacheFolderModule } from "./ExtensionCacheFolder";
import { ExtensionManagerModule } from "./ExtensionManager";
import { ExtensionsModule } from "./Extensions";
import { FileSystemUtilityModule } from "./FileSystemUtility";
import { GlobalShortcutModule } from "./GlobalShortcut";
import { LoggerModule } from "./Logger";
import { NativeThemeModule } from "./NativeTheme";
import { OperatingSystemModule } from "./OperatingSystem";
import { SearchIndexModule } from "./SearchIndex";
import { SettingsFileModule } from "./SettingsFile";
import { SettingsManagerModule } from "./SettingsManager";
import { SettingsReaderModule } from "./SettingsReader";
import { SettingsWriterModule } from "./SettingsWriter";
import { TrayIconModule } from "./TrayIcon";
import { UeliCommandModule } from "./UeliCommand";

(async () => {
    await app.whenReady();

    app.dock?.hide();

    const dependencyInjector = DependencyInjectorModule.bootstrap();

    // Electron Modules
    dependencyInjector.registerInstance<string>("Platform", platform());
    dependencyInjector.registerInstance<App>("App", app);
    dependencyInjector.registerInstance<IpcMain>("IpcMain", ipcMain);
    dependencyInjector.registerInstance<NativeTheme>("NativeTheme", nativeTheme);
    dependencyInjector.registerInstance<Shell>("Shell", shell);
    dependencyInjector.registerInstance<GlobalShortcut>("GlobalShortcut", globalShortcut);
    dependencyInjector.registerInstance<Emitter<Record<string, unknown>>>("Emitter", mitt<Record<string, unknown>>());
    dependencyInjector.registerInstance<SystemPreferences>("SystemPreferences", systemPreferences);
    dependencyInjector.registerInstance<Dialog>("Dialog", dialog);

    // Ueli Modules
    ClockModule.bootstrap(dependencyInjector);
    AboutUeliModule.bootstrap(dependencyInjector);
    LoggerModule.bootstrap(dependencyInjector);
    EventEmitterModule.bootstrap(dependencyInjector);
    EventSubscriberModule.bootstrap(dependencyInjector);
    CommandlineUtilityModule.bootstrap(dependencyInjector);
    FileSystemUtilityModule.bootstrap(dependencyInjector);
    OperatingSystemModule.bootstrap(dependencyInjector);
    SettingsFileModule.bootstrap(dependencyInjector);
    SettingsReaderModule.bootstrap(dependencyInjector);
    SettingsWriterModule.bootstrap(dependencyInjector);
    SettingsManagerModule.bootstrap(dependencyInjector);
    SearchIndexModule.bootstrap(dependencyInjector);
    NativeThemeModule.bootstrap(dependencyInjector);
    await BrowserWindowModule.bootstrap(dependencyInjector);
    GlobalShortcutModule.bootstrap(dependencyInjector);
    ActionHandlerModule.bootstrap(dependencyInjector);
    TrayIconModule.bootstrap(dependencyInjector);
    DialogModule.bootstrap(dependencyInjector);
    UeliCommandModule.bootstrap(dependencyInjector);
    await ExtensionCacheFolderModule.bootstrap(dependencyInjector);
    ExtensionsModule.bootstrap(dependencyInjector);
    ExtensionManagerModule.bootstrap(dependencyInjector);
})();
