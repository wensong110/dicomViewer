import React from 'react';
import ReactDOM from 'react-dom';
import Render3D from '../cornerstone/src/components/vtk3D';
import setMPRLayout from '../vtk/src/utils/setMPRLayout';
export default {
  id: '3d-View',
  getToolbarModule({ servicesManager, commandsManager }) {
    return {
      definitions: [
        {
          id: '3D',
          label: '3D',
          icon: 'cube',
          type: 'command',
          //CustomComponent: VTKMPRToolbarButton,
          commandName: 'render',
          context: 'ACTIVE_VIEWPORT::CORNERSTONE',
        },
      ],
    };
  },
  getCommandsModule({ servicesManager, commandsManager }) {
    return {
      definitions: {
        render: {
          commandFn: async ({ viewports }) => {
            const displaySet =
              viewports.viewportSpecificData[viewports.activeViewportIndex];
            const viewportProps = [
              {
                orientation: {
                  sliceNormal: [0, 0, 1],
                  viewUp: [0, -1, 0],
                },
              },
            ];
            try {
              await setMPRLayout(displaySet, viewportProps, 1, 1);
              let estado;
              estado = 'hidden';
              const toolbar = Array.from(
                document.getElementsByClassName('ToolbarRow')
              );
              for (let i = 2; i < 8; i++) {
                let elem = toolbar[0].children[i];
                elem.style.visibility = estado;
              }
            } catch (error) {
              throw new Error(error);
            }
            const vistaActivada = Array.from(
              document.getElementsByClassName('vtk-viewport-handler')
            );
            vistaActivada[0].innerHTML = '';
            ReactDOM.render(<Render3D />, vistaActivada[0]);
          },
          storeContexts: ['viewports'],
          options: {},
        },
      },
      defaultContext: 'VIEWER',
    };
  },
};
