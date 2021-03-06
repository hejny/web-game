import * as BABYLON from 'babylonjs';
import { Store } from 'redux';
import { createAction } from '../redux-reducers/blocks';
import { MouseModes } from '../redux-reducers/ui';
import { Block } from '../classes/block';
import { Vector3 } from '../classes/vector3';
import { createMaterial } from './create-material';
import { COLOR_HOVER } from '../config';

//todo default vs {} exports
export function injectBlocksChanges(scene: BABYLON.Scene, store: Store<Object>) {
    const canvas = scene.getEngine().getRenderingCanvas() as any;
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;

    const materialHover = createMaterial(COLOR_HOVER, scene);

    let pointUnderPointer: Vector3 = null;
    function onPointerDown(event) {
        pointUnderPointer = new Vector3(event.clientX, event.clientY, 0);
    }

    function onPointerUp(event) {
        if (Vector3.distance(pointUnderPointer, new Vector3(event.clientX, event.clientY, 0)) > 20) return;

        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;

            const mouseMode = (store.getState() as any).ui.mouseMode;
            let button1: number, button2: number;
            if (mouseMode === MouseModes.ADD) {
                button1 = 0;
                button2 = 2;
            } else if (mouseMode === MouseModes.DELETE) {
                button1 = 2;
                button2 = 0;
            }

            switch (event.button) {
                case button1:
                    let position: Vector3;

                    if (currentMesh.name === 'ground') {
                        position = new Vector3(
                            Math.round(pickInfo.pickedPoint.x),
                            0,
                            Math.round(pickInfo.pickedPoint.z),
                        );
                    } else {
                        const diff = currentMesh.position.subtract(pickInfo.pickedPoint);
                        position = currentMesh.position.clone();

                        ['x', 'y', 'z'].forEach((dimension) => {
                            if (diff[dimension] >= 0.5 - 0.001) {
                                position[dimension]--;
                            } else if (diff[dimension] <= -0.5 + 0.001) {
                                position[dimension]++;
                            }
                        });
                    }

                    store.dispatch(
                        createAction.BLOCK_ADD(new Block(undefined, position, (store.getState() as any).ui.color)),
                    );

                    break;

                case button2:
                    if (currentMesh.name === 'ground') return;
                    store.dispatch(createAction.BLOCK_DELETE(currentMesh.name));
                    break;
            }
        }
    }

    function onContextMenu(event) {
        event.preventDefault();
    }

    let lastMesh = null;
    let lastMaterial: BABYLON.Material;

    function onPointerMove(event) {
        if (lastMesh) {
            lastMesh.material = lastMaterial;
        }
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
            const currentMesh = pickInfo.pickedMesh;
            if (currentMesh.name === 'ground') return;
            lastMaterial = currentMesh.material;
            currentMesh.material = materialHover;
            lastMesh = currentMesh;
        } else {
            lastMesh = null;
        }
    }

    canvas.addEventListener('pointerdown', onPointerDown, false);
    canvas.addEventListener('pointerup', onPointerUp, false);
    canvas.addEventListener('contextmenu', onContextMenu, false);
    canvas.addEventListener('pointermove', onPointerMove, false);
}
