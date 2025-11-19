"use client";

import Image from "next/image";
import Link from "next/link";
import { sdk } from "@farcaster/miniapp-sdk";
import { resolveClientFid, useMiniapp } from "~~/components/MiniappProvider";

export const MiniappUserInfo = () => {
  const { context, isReady, isMiniApp, openProfile } = useMiniapp();
  const user = context.user;
  const clientName = resolveClientFid(context.client?.clientFid);

  // Helper to format values with "-" for undefined/null
  const formatValue = (value: any, postfix?: string): string => {
    if (!isReady) return "";
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "✓" : "✗";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value) + (postfix ? ` ${postfix}` : "");
  };

  // Get location details based on type
  const getLocationDetails = () => {
    if (!context.location) return "-";
    const loc = context.location;
    switch (loc.type) {
      case "cast_embed":
        return `Cast by @${loc.cast.author.username || "unknown"} (${loc.embed})`;
      case "cast_share":
        return `Shared cast by @${loc.cast.author.username || "unknown"}`;
      case "notification":
        return `${loc.notification.title} - ${loc.notification.body}`;
      case "open_miniapp":
        return `From ${loc.referrerDomain}`;
      case "channel":
        return `${loc.channel.name} (${loc.channel.key})`;
      case "launcher":
        return "Direct launch";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4 text-center">
        <hr className="mt-8 mb-4" />
        <h2 className="text-xl font-bold mt-4">MiniApp Context</h2>
        <p className="text-sm">
          {isReady ? (isMiniApp ? "✅ Ready (MiniApp)" : "✅ Ready (WebApp)") : "⏳ Loading..."}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th className="font-bold w-1/3">Property</th>
              <th className="font-bold">Value</th>
            </tr>
          </thead>
          <tbody>
            {/* User Section */}
            <tr className="bg-base-300">
              <th colSpan={2} className="text-left font-bold">
                👤 User
              </th>
            </tr>
            <tr>
              <td>FID</td>
              <td className="font-mono">{formatValue(user?.fid)}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td className="font-mono">
                {user?.fid ? (
                  <span className="cursor-pointer" onClick={() => openProfile({ fid: user?.fid })}>
                    {formatValue(user?.username)}
                  </span>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
            <tr>
              <td>Display Name</td>
              <td>{formatValue(user?.displayName)}</td>
            </tr>
            <tr>
              <td>Profile Image</td>
              <td>
                {user?.pfpUrl ? (
                  <Image
                    src={user.pfpUrl}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                    unoptimized
                  />
                ) : (
                  "-"
                )}
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{formatValue(user?.location?.description)}</td>
            </tr>

            {/* Location Context Section */}
            <tr className="bg-base-300">
              <th colSpan={2} className="text-left font-bold">
                📍 Launch Context
              </th>
            </tr>
            <tr>
              <td>Launch Type</td>
              <td className="font-mono">{formatValue(context.location?.type)}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td className="max-w-xs truncate">{getLocationDetails()}</td>
            </tr>

            {/* Client Section */}
            <tr className="bg-base-300">
              <th colSpan={2} className="text-left font-bold">
                💻 Client
              </th>
            </tr>
            <tr>
              <td>Platform Type</td>
              <td className="font-mono">{formatValue(context.client?.platformType)}</td>
            </tr>
            <tr>
              <td>Client FID</td>
              <td>
                <div className="flex flex-col">
                  <span className="font-mono">{formatValue(context.client?.clientFid)}</span>
                  {context.client?.clientFid && <span className="text-xs opacity-70">{clientName}</span>}
                </div>
              </td>
            </tr>
            <tr>
              <td>Added to Client</td>
              <td>{formatValue(context.client?.added)}</td>
            </tr>
            <tr>
              <td>Safe Area - Top</td>
              <td className="font-mono">{formatValue(context.client?.safeAreaInsets?.top, "px")}</td>
            </tr>
            <tr>
              <td>Safe Area - Bottom</td>
              <td className="font-mono">{formatValue(context.client?.safeAreaInsets?.bottom, "px")}</td>
            </tr>
            <tr>
              <td>Safe Area - Left</td>
              <td className="font-mono">{formatValue(context.client?.safeAreaInsets?.left, "px")}</td>
            </tr>
            <tr>
              <td>Safe Area - Right</td>
              <td className="font-mono">{formatValue(context.client?.safeAreaInsets?.right, "px")}</td>
            </tr>
            <tr>
              <td>Notifications Enabled</td>
              <td>{context.client?.notificationDetails ? "✓ Available" : "-"}</td>
            </tr>

            {/* Features Section */}
            <tr className="bg-base-300">
              <th colSpan={2} className="text-left font-bold">
                ⚡ Features
              </th>
            </tr>
            <tr>
              <td>Haptics</td>
              <td>{formatValue(context.features?.haptics)}</td>
            </tr>
            <tr>
              <td>Camera/Mic Access</td>
              <td>{formatValue(context.features?.cameraAndMicrophoneAccess)}</td>
            </tr>

            {/* Environment Section */}
            <tr className="bg-base-300">
              <th colSpan={2} className="text-left font-bold">
                🌐 Environment
              </th>
            </tr>
            <tr>
              <td>Is MiniApp</td>
              <td>{formatValue(isMiniApp)}</td>
            </tr>
            <tr>
              <td>SDK Ready</td>
              <td>{formatValue(isReady)}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-sm mt-4">
          More Info of MiniApp Context:{" "}
          <Link
            href="https://miniapps.farcaster.xyz/docs/sdk/context"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            https://miniapps.farcaster.xyz/docs/sdk/context
          </Link>
        </div>
        <hr className="mt-8 mb-4" />
        <div className="mt-6">
          <h2 className="text-xl font-bold text-center mt-4">Haptics Demo</h2>
          {!context.features?.haptics && <p className="text-red-500 text-center my-0">Haptics not available</p>}
          <p className="font-semibold mb-2">Impact:</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.impactOccurred("light")}
            >
              Light
            </button>
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.impactOccurred("medium")}
            >
              Medium
            </button>
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.impactOccurred("heavy")}
            >
              Heavy
            </button>
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.impactOccurred("soft")}
            >
              Soft
            </button>
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.impactOccurred("rigid")}
            >
              Rigid
            </button>
          </div>
          <p className="font-semibold mb-2">Notification:</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.notificationOccurred("success")}
            >
              Success
            </button>
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.notificationOccurred("error")}
            >
              Error
            </button>
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.notificationOccurred("warning")}
            >
              {" "}
              Warning
            </button>
          </div>
          <p className="font-semibold mb-2">Selection:</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-sm btn-primary"
              disabled={!context.features?.haptics}
              onClick={() => sdk.haptics.selectionChanged()}
            >
              {" "}
              Selection Changed
            </button>
          </div>
        </div>
        <hr className="mt-8 mb-4" />
      </div>
    </div>
  );
};
