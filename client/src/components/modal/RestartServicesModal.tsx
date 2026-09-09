import RestartIcon from "../../assets/ui/restart.svg?react";
import ServicesIcon from "../../assets/ui/services.svg?react";

type RestartServicesModalProps = {
  
};

export function RestartServicesModal({
  
}: RestartServicesModalProps) {
  return (
    <div className="restartservices-container">
      <div className="restartservices-header">
        <div className="restartservices-title">
          <div className="restartservices-title-icon">
            <ServicesIcon />
          </div>

          <div>
            <h2>Restart</h2>
            <p>Manage Services</p>
          </div>
        </div>
      </div>

      <div className="restartservices-section">
        <div className="restartservices-section-title">Services</div>

        <button
          className="restartservices-container-button"
          data-controller-focus
          data-controller-group="Restart Services-modal"
          onClick={() => {}}
        >
          <div className="restartservices-button-icon">
            <RestartIcon />
          </div>

          <div className="restartservices-button-content">
            <span>Frontend</span>
            <small>Restart frontend</small>
          </div>
        </button>

        <button
          className="restartservices-container-button"
          data-controller-focus
          data-controller-group="Restart Services-modal"
          onClick={() => {}}
        >
          <div className="restartservices-button-icon">
            <RestartIcon />
          </div>

          <div className="restartservices-button-content">
            <span>Backend</span>
            <small>Restart backend</small>
          </div>
        </button>
      </div>
    </div>
  );
}
