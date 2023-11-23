using TI5yncronizer.Core.FileWatcher;

namespace TI5yncronizer.Client.FileWatcher;

public class FileWatcherActions(ILogger<FileWatcherActions> logger) : IFileWatcherActions
{
    public void OnChanged(object sender, FileSystemEventArgs e, IWatcher watcher)
    {
        logger.LogInformation("OnChanged {FullPath}", e.FullPath);
    }

    public void OnCreated(object sender, FileSystemEventArgs e, IWatcher watcher)
    {
        logger.LogInformation("OnCreated {FullPath}", e.FullPath);
    }

    public void OnDeleted(object sender, FileSystemEventArgs e, IWatcher watcher)
    {
        logger.LogInformation("OnDeleted {FullPath}", e.FullPath);
    }

    public void OnError(object sender, ErrorEventArgs e, IWatcher watcher)
    {
        logger.LogInformation("OnError {Error}", e);
    }

    public void OnRenamed(object sender, RenamedEventArgs e, IWatcher watcher)
    {
        logger.LogInformation("OnRenamed {FullPath}", e.FullPath);
    }
}
