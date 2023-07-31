import React, { useState, useEffect } from 'react';

const Player = ({
  position,
  collisionBlocks,
  platformCollisionBlocks,
  imageSrc,
  frameRate,
  scale = 0.5,
  animations,
}) => {
  const [ velocity, setVelocity ] = useState({ x: 0, y: 1 });
  const [ hitbox, setHitbox ] = useState({
    position: { x: position.x, y: position.y },
    width: 10,
    height: 10,
  });
  const [ camerabox, setCamerabox ] = useState({
    position: { x: position.x, y: position.y },
    width: 200,
    height: 80,
  });

  useEffect(() => {
    const updateCamerabox = () => {
      setCamerabox((prevCamerabox) => ({
        position: {
          x: position.x - 50,
          y: position.y,
        },
        width: 200,
        height: 80,
      }));
    };

    updateCamerabox();
  }, [ position ]);

  useEffect(() => {
    const updateHitbox = () => {
      setHitbox((prevHitbox) => ({
        position: {
          x: position.x + 35,
          y: position.y + 26,
        },
        width: 14,
        height: 27,
      }));
    };

    updateHitbox();
  }, [ position ]);

  useEffect(() => {
    const checkForHorizontalCollisions = () => {
      for (let i = 0; i < collisionBlocks.length; i++) {
        const collisionBlock = collisionBlocks[i];

        if (collision({ object1: hitbox, object2: collisionBlock })) {
          if (velocity.x > 0) {
            setVelocity((prevVelocity) => ({ ...prevVelocity, x: 0 }));

            const offset = hitbox.position.x - position.x + hitbox.width;

            setPosition((prevPosition) => ({
              ...prevPosition,
              x: collisionBlock.position.x - offset - 0.01,
            }));
            break;
          }

          if (velocity.x < 0) {
            setVelocity((prevVelocity) => ({ ...prevVelocity, x: 0 }));

            const offset = hitbox.position.x - position.x;

            setPosition((prevPosition) => ({
              ...prevPosition,
              x: collisionBlock.position.x + collisionBlock.width - offset + 0.01,
            }));
            break;
          }
        }
      }
    };

    checkForHorizontalCollisions();
  }, [ collisionBlocks, hitbox, position, velocity ]);

  useEffect(() => {
    const applyGravity = () => {
      setVelocity((prevVelocity) => ({
        ...prevVelocity,
        y: prevVelocity.y + gravity,
      }));

      setPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + velocity.y,
      }));
    };

    applyGravity();
  }, [ velocity ]);

  useEffect(() => {
    const checkForVerticalCollisions = () => {
      for (let i = 0; i < collisionBlocks.length; i++) {
        const collisionBlock = collisionBlocks[i];

        if (collision({ object1: hitbox, object2: collisionBlock })) {
          if (velocity.y > 0) {
            setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));

            const offset = hitbox.position.y - position.y + hitbox.height;

            setPosition((prevPosition) => ({
              ...prevPosition,
              y: collisionBlock.position.y - offset - 0.01,
            }));
            break;
          }

          if (velocity.y < 0) {
            setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));

            const offset = hitbox.position.y - position.y;

            setPosition((prevPosition) => ({
              ...prevPosition,
              y: collisionBlock.position.y + collisionBlock.height - offset + 0.01,
            }));
            break;
          }
        }
      }

      for (let i = 0; i < platformCollisionBlocks.length; i++) {
        const platformCollisionBlock = platformCollisionBlocks[i];

        if (platformCollision({ object1: hitbox, object2: platformCollisionBlock })) {
          if (velocity.y > 0) {
            setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));

            const offset = hitbox.position.y - position.y + hitbox.height;

            setPosition((prevPosition) => ({
              ...prevPosition,
              y: platformCollisionBlock.position.y - offset - 0.01,
            }));
            break;
          }
        }
      }
    };

    checkForVerticalCollisions();
  }, [ collisionBlocks, hitbox, platformCollisionBlocks, position, velocity ]);

  return (
    // Render the player component here based on the updated position and other properties
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: "50px",
        height: "50px",
        background: `url(${imageSrc})`,
        backgroundSize: 'cover',
        transform: `scale(${scale})`,
      }}
    ></div>
  );
};

export default Player;